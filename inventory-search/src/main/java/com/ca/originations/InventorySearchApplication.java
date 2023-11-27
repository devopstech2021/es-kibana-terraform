package com.ca.originations;

import com.ca.originations.models.Vehicle;
import com.ca.originations.repository.VehicleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;

@SpringBootApplication
public class InventorySearchApplication {
    @Autowired
    ElasticsearchOperations operations;

    @Autowired
    VehicleRepository repository;

    @PostConstruct
    public void insertDataSample() {

        operations.indexOps(Vehicle.class).refresh();
    }

    public static void main(String[] args) {
        SpringApplication.run(InventorySearchApplication.class, args);
    }
}
