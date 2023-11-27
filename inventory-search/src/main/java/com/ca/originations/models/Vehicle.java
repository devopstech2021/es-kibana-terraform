package com.ca.originations.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

import java.util.List;

import static org.springframework.data.elasticsearch.annotations.FieldType.Date;

@Data
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "cars")
public class Vehicle {
    private @Id String id;

    @Field("vehicle_id")
    @JsonProperty("vehicle_id")
    private int vehicleId;

    @Field("dealer_id")
    @JsonProperty("dealer_id")
    private String dealerId;

    @Field("vin")
    private String vin;

    @Field("name")
    private String name;

    @Field("description")
    private String description;

    @Field("vehicle_year")
    @JsonProperty("vehicle_year")
    private int vehicleYear;

    @Field("selling_price")
    @JsonProperty("selling_price")
    private double sellingPrice;

    @Field("make")
    private String make;

    @Field("model")
    private String model;

    @Field("mileage")
    private int mileage;

    @Field("exterior_color")
    @JsonProperty("exterior_color")
    private String exteriorColor;

    @Field(name = "creation_dt", type = Date)
    @JsonProperty("creation_dt")
    private String creationDate;

    @Field("location")
    private Location location;

    @Field("zipcode")
    private int zipcode;

    @Field("fuel")
    private String fuel;

    @Field("interior_color")
    @JsonProperty("interior_color")
    private String interiorColor;

    @Field("transmission")
    private String transmission;

    @Field("fuel_economy_highway")
    @JsonProperty("fuel_economy_highway")
    private int fuelEconomyHighway;

    @Field("fuel_economy_city")
    @JsonProperty("fuel_economy_city")
    private int fuelEconomyCity;

    @Field("premium_features")
    @JsonProperty("premium_features")
    private List<String> premiumFeatures;
}

