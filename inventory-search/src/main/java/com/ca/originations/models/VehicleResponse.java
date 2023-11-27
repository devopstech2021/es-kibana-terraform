package com.ca.originations.models;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class VehicleResponse {
    private Long total;
    private Integer page;
    private Integer limit;
    private List<Vehicle> result;
}
