package com.ca.originations.services;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.ca.originations.models.Vehicle;
import com.ca.originations.models.VehicleResponse;
import com.ca.originations.models.requests.SearchRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Slf4j
@Component
public class SearchService {

    @Autowired
    private ElasticsearchClient client;

    public VehicleResponse search(SearchRequest searchRequest) throws RuntimeException,IOException {
        Query query = searchRequest.getQuery().getQuery("test");
        List<SortOptions> sortOptions = searchRequest.getSortOptions();

        Integer startOffset = (searchRequest.getPage() -1) * searchRequest.getLimit();
        SearchResponse<Vehicle> searchResponse = client.search(s -> s
                .index(Vehicle.indexName)
                .query(query).sort(sortOptions).from(startOffset).size(searchRequest.getLimit()), Vehicle.class);

        if (searchResponse.hits().total() == null || searchResponse.hits().total().value() <= 0) {
            return VehicleResponse.builder().total(0L).page(searchRequest.getPage()).limit(searchRequest.getLimit()).result(new ArrayList<>()).build();
        }

        List<Hit<Vehicle>> hits = searchResponse.hits().hits();
        log.info("Total hits: " + searchResponse.hits().total());
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
}
