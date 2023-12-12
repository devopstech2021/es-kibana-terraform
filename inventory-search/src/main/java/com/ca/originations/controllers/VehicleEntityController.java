package com.ca.originations.controllers;

import com.ca.originations.models.Vehicle;
import com.ca.originations.models.VehicleResponse;
import com.ca.originations.models.requests.SearchRequest;
import com.ca.originations.services.SearchService;
import com.ca.originations.services.VehicleEntityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/inventory/v1/vehicles")
@CrossOrigin(origins = "http://ec2-3-142-119-225.us-east-2.compute.amazonaws.com:3000")
public class VehicleEntityController {

    private static final Logger logger = LoggerFactory.getLogger(VehicleEntityController.class);

    @Autowired
    private VehicleEntityService entityService;

    @Autowired
    private SearchService searchService;

    @GetMapping
    public Page<Vehicle> getAllEntities() {
        return entityService.getAllEntities();
    }

    @PostMapping("/search")
    public VehicleResponse getEntitiesBySearchCriteria(@RequestBody SearchRequest searchRequest) {
        logger.info("searchCriteria: {}", searchRequest);
        try {
            return searchService.search(searchRequest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/aggregates")
    public Map<String, Map<String, Object>> getAggregatesBySearchCriteria(@RequestBody SearchRequest searchRequest) {
        logger.info("searchCriteria: {}", searchRequest);
        try {
            return searchService.getAggregates(searchRequest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
