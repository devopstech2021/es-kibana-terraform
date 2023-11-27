package com.ca.originations.models.requests;

import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.RangeQuery;
import co.elastic.clients.json.JsonData;
import lombok.*;

import java.util.Map;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RangeCriteria  implements ESQuery {
    private Integer to;
    private Integer from;

    public static RangeCriteria build(Map<String, Integer> data){
        return new RangeCriteria(data.get("to"), data.get("from"));
    }
    @Override
    public Query getQuery(String attribute) {
        return RangeQuery.of(r -> r
                .field(attribute)
                .gte(JsonData.of(from))
                .lte(JsonData.of(to))
        )._toQuery();
    }
}
