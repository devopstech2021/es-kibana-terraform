package com.ca.originations.models.requests;

import co.elastic.clients.elasticsearch._types.FieldSort;
import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.SortOrder;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
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
}