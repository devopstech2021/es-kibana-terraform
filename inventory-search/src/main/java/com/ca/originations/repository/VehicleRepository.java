package com.ca.originations.repository;

import com.ca.originations.models.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface VehicleRepository extends ElasticsearchRepository<Vehicle, String> {

    Page<Vehicle> findByName(String name, Pageable pageable);

    @Query("{\"bool\": {\"must\": [{\"match\": {\"makeYear\": \"?0\"}}]}}")
    Page<Vehicle> findByMakeYearCustomQuery(String year, Pageable pageable);
}