package com.ca.originations.models.requests;

import co.elastic.clients.elasticsearch._types.query_dsl.GeoDistanceQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import lombok.*;

import java.util.Map;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DistanceCriteria implements ESQuery {
    private double lat;
    private double lon;

    public static DistanceCriteria build(Map<String, Double> data){
        return new DistanceCriteria(data.get("lat"), data.get("lon"));
    }

    public Query getQuery(String attribute) {
        return GeoDistanceQuery.of(r -> r
                .field(attribute)
                .location(geoLocation -> geoLocation
                        .latlon(latLonGeoLocation -> latLonGeoLocation
                                .lon(lon).lat(lat)))
                .distance("10KM")
        )._toQuery();
    }
}
