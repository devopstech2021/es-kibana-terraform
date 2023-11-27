package com.ca.originations.models.requests;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class FilterCriteria implements ESQuery {
    private String type;
    private Object value;

    private Query getTypeBasedQuery(String attribute) {
        return switch (type) {
            case "range" -> (RangeCriteria.build((Map<String, Integer>) value)).getQuery(attribute);
            case "match" -> getStringValueMatchQuery(attribute, value);
            case "regx" -> getStringValueMatchQuery(attribute, value);
            case "geo" -> (DistanceCriteria.build((Map<String, Double>) value)).getQuery(attribute);
            case "Array" -> getMultiValueMatchQuery(attribute, (List<Object>) value);
            default -> throw new RuntimeException("Invalid type provided for query");
        };
    }

    private Query getMultiValueMatchQuery(String attribute, List<Object> value) {
        var boolQuery = BoolQuery.of(
                bq -> {
                    for (Object o : value) {
                        bq.should(getStringValueMatchQuery(attribute, o));
                    }
                    return bq;
                }
        );
        return boolQuery._toQuery();
    }

    private Query getStringValueMatchQuery(String attribute, Object value) {
       return MatchQuery.of(m -> m
                .field(attribute)
                .query(value.toString())
        )._toQuery();
    }

    @Override
    public Query getQuery(String attribute) {
        return getTypeBasedQuery(attribute);
    }
}