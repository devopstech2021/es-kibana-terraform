package com.ca.originations.services;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregate;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.ca.originations.models.Vehicle;
import com.ca.originations.models.VehicleResponse;
import com.ca.originations.models.requests.SearchRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Component
public class SearchService {

    private Logger logger = Logger.getLogger(SearchService.class.getName());

    @Autowired
    private ElasticsearchClient client;

    public VehicleResponse search(SearchRequest searchRequest) throws RuntimeException, IOException {
        Query query = searchRequest.getQuery().getQuery("test");
        List<SortOptions> sortOptions = searchRequest.getSortOptions();

        Integer startOffset = (searchRequest.getPage() - 1) * searchRequest.getLimit();
        SearchResponse<Vehicle> searchResponse = client.search(s -> s
                .index(Vehicle.indexName)
                .query(query).sort(sortOptions).from(startOffset).size(searchRequest.getLimit()), Vehicle.class);

        if (searchResponse.hits().total() == null || searchResponse.hits().total().value() <= 0) {
            return VehicleResponse.builder().total(0L).page(searchRequest.getPage()).limit(searchRequest.getLimit()).result(new ArrayList<>()).build();
        }

        List<Hit<Vehicle>> hits = searchResponse.hits().hits();
        logger.info("Total hits: " + searchResponse.hits().total());
        List<Vehicle> vehicles = new ArrayList<>();

        for (Hit<Vehicle> hit : hits) {
            vehicles.add(hit.source());
        }

        VehicleResponse response = VehicleResponse.builder()
                .total(searchResponse.hits().total().value())
                .page(searchRequest.getPage())
                .limit(searchRequest.getLimit())
                .result(vehicles)
                .build();
        return response;
    }

    public Map<String, Map<String, Object>> getAggregates(SearchRequest searchRequest) throws IOException {

        Query query = searchRequest.getQuery().getQuery("test");
        List<SortOptions> sortOptions = searchRequest.getSortOptions();

        Map<String, Aggregation> aggregationMap = searchRequest.getAggregations();
        logger.info("Aggregates: " + aggregationMap);
        SearchResponse<Vehicle> searchResponse = client.search(s -> s
                .index(Vehicle.indexName)
                .query(query).aggregations(aggregationMap).size(500), Vehicle.class
        );

        logger.info("Total Aggregates: " + searchResponse.aggregations());
        logger.info("Total hits: " + searchResponse.hits().total());

        Map<String, Map<String, Object>> aggs = new HashMap<>();
        processAggregates(searchResponse.aggregations(), aggs);
        aggs.put("total", Map.of("total_vehicles", searchResponse.hits().total().value()));
        return aggs;
    }

    private void processAggregates(Map<String, Aggregate> aggregations, Map<String, Map<String, Object>> aggs) {

        for (Map.Entry<String, Aggregate> aggregateResult : aggregations.entrySet()) {
            processAggregation(aggregateResult.getKey(), aggregateResult.getValue(), aggs);
        }
    }

    private void processAggregation(String key, Aggregate aggregate, Map<String, Map<String, Object>> aggs) {
        if (aggregate.isSterms()) {
            aggregate.sterms().buckets().array().forEach(b -> {
                        var termAgg = aggs.get(key);
                        if (termAgg == null) {
                            termAgg = new HashMap<>();
                            termAgg.put(b.key().stringValue(), b.docCount());
                        } else {
                            var docCount = termAgg.get(b.key().stringValue());
                            if (docCount == null) {
                                termAgg.put(b.key().stringValue(), b.docCount());
                            } else {
                                termAgg.put(b.key().stringValue(), (Long) docCount + b.docCount());
                            }
                        }
                        aggs.put(key, termAgg);
                    }
            );
        }

        var doubleValue = 0.0;
        if (aggregate.isMin()) {
            doubleValue = aggregate.min().value();
        }
        if (aggregate.isMax()) {
            doubleValue = aggregate.max().value();
        }

        if (aggregate.isMax() || aggregate.isMin()) {
            switch (key) {
                case "minPrice":
                    addAggregate(aggs, doubleValue, "min","price");
                    break;
                case "maxPrice":
                    addAggregate(aggs, doubleValue, "max", "price");
                    break;
                case "minYear":
                    addAggregate(aggs, doubleValue, "min", "vehicleYear");
                    break;
                case "maxYear":
                    addAggregate(aggs, doubleValue, "max", "vehicleYear");
                    break;
                case "minMileage":
                    addAggregate(aggs, doubleValue, "min", "milage");
                    break;
                case "maxMileage":
                    addAggregate(aggs, doubleValue, "max", "milage");
                    break;
            }
        }
    }

    private void addAggregate(Map<String, Map<String, Object>> aggs, double doubleValue, String key, String aggKey) {
        var aggregateType = aggs.get(aggKey);
        if (aggregateType == null) {
            aggregateType = new HashMap<>();
            aggregateType.put(key, doubleValue);
        } else {
            var mileage = aggregateType.get(key);
            if (mileage == null) {
                aggregateType.put(key, doubleValue);
            } else {
                aggregateType.put(key, (Double)mileage + doubleValue);
            }
        }
        aggs.put(aggKey, aggregateType);
    }
}
