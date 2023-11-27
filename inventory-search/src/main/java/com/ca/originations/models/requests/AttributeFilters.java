package com.ca.originations.models.requests;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Data
public class AttributeFilters implements ESQuery {

    private Logger logger = LoggerFactory.getLogger(AttributeFilters.class);

    @JsonProperty("name")
    private FilterCriteria name;

    @JsonProperty("make")
    private FilterCriteria make;

    @JsonProperty("model")
    private FilterCriteria model;

    @JsonProperty("selling_price")
    private FilterCriteria sellingPrice;

    @JsonProperty("mileage")
    private FilterCriteria mileage;

    @JsonProperty("vehicle_year")
    private FilterCriteria vehicleYear;

    @JsonProperty("exterior_color")
    private FilterCriteria exteriorColor;

    @Override
    public Query getQuery(String attribute) throws RuntimeException {

        var boolQuery = BoolQuery.of(
            bq -> {
                if (name != null) {
                    bq.must(name.getQuery("name"));
                }
                if (make != null) {
                    bq.must(make.getQuery("make"));
                }
                if (exteriorColor != null) {
                    bq.must(exteriorColor.getQuery("exterior_color"));
                }
                if (model != null) {
                    bq.must(model.getQuery("model"));
                }
                if (mileage != null) {
                    bq.must(mileage.getQuery("mileage"));
                }
                if (vehicleYear != null) {
                    bq.must(vehicleYear.getQuery("vehicle_year"));
                }
                if (sellingPrice != null) {
                    bq.must(sellingPrice.getQuery("selling_price"));
                }
                return bq;
            }
        );


        logger.info("Query: " + boolQuery._toQuery());
        return boolQuery._toQuery();
    }
}
