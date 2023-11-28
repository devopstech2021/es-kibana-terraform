package com.ca.originations.controllers;

import com.ca.originations.models.Vehicle;
import com.ca.originations.models.VehicleResponse;
import com.ca.originations.models.requests.SearchRequest;
import com.ca.originations.services.SearchService;
import com.ca.originations.services.VehicleEntityService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/inventory/v1/vehicles")
public class VehicleEntityController {
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
        log.info("searchCriteria: {}", searchRequest);
        try {
            return searchService.search(searchRequest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
