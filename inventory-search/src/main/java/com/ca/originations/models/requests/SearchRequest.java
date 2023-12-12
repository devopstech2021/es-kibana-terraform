package com.ca.originations.models.requests;

import co.elastic.clients.elasticsearch._types.FieldSort;
import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.aggregations.MaxAggregation;
import co.elastic.clients.elasticsearch._types.aggregations.MinAggregation;
import co.elastic.clients.elasticsearch._types.aggregations.TermsAggregation;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class SearchRequest {
    @JsonProperty("query")
    private AttributeFilters query;

    @JsonProperty("page")
    private int page;

    @JsonProperty("sort")
    private Map<String, String> sort;

    @JsonProperty("limit")
    private int limit;

    public List<SortOptions> getSortOptions() {
        List<SortOptions> sortOptions = new ArrayList<>();
        for (Map.Entry<String, String> entry : sort.entrySet()) {
            FieldSort field = new FieldSort.Builder().field(entry.getKey()).order(SortOrder.valueOf(entry.getValue())).build();
            SortOptions sortOptions1 = new  SortOptions.Builder().field(field).build();
            sortOptions.add(sortOptions1);
        }
        return sortOptions;
    }

    public Map<String, Aggregation> getAggregations() {

        Map<String, Aggregation> aggregationMap = new HashMap<>();

        TermsAggregation modelTerm = new TermsAggregation.Builder().field("model").size(50).build();
        TermsAggregation exteriorColorTerm = new TermsAggregation.Builder().field("exterior_color").size(15).build();
        TermsAggregation makeTerm = new TermsAggregation.Builder().field("make").size(50).build();
        Aggregation models = new Aggregation.Builder().terms(modelTerm).build();
        Aggregation colors = new Aggregation.Builder().terms(exteriorColorTerm).build();
        Aggregation makes = new Aggregation.Builder().terms(makeTerm).build();
        aggregationMap.put("model", models);
        aggregationMap.put("colors", colors);
        aggregationMap.put("make", makes);

        MinAggregation minPrice = new MinAggregation.Builder().field("selling_price").build();
        Aggregation minPriceAgg = new Aggregation.Builder().min(minPrice).build();
        aggregationMap.put("minPrice", minPriceAgg);

        MaxAggregation maxPrice = new MaxAggregation.Builder().field("selling_price").build();
        Aggregation maxPriceAgg = new Aggregation.Builder().max(maxPrice).build();
        aggregationMap.put("maxPrice", maxPriceAgg);

        MinAggregation minYear = new MinAggregation.Builder().field("make_year").build();
        Aggregation minYearAgg = new Aggregation.Builder().min(minYear).build();
        aggregationMap.put("minYear", minYearAgg);

        MaxAggregation maxYear = new MaxAggregation.Builder().field("make_year").build();
        Aggregation maxYearAgg = new Aggregation.Builder().max(maxYear).build();
        aggregationMap.put("maxYear", maxYearAgg);

        MinAggregation minMileage = new MinAggregation.Builder().field("mileage").build();
        Aggregation minMileageAgg = new Aggregation.Builder().min(minMileage).build();
        aggregationMap.put("minMileage", minMileageAgg);

        MaxAggregation maxMileage = new MaxAggregation.Builder().field("mileage").build();
        Aggregation maxMileageAgg = new Aggregation.Builder().max(maxMileage).build();
        aggregationMap.put("maxMileage", maxMileageAgg);

        return aggregationMap;
    }
}