package com.ca.originations.services;

import com.ca.originations.models.Vehicle;
import com.ca.originations.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class VehicleEntityService {

    @Autowired
    private VehicleRepository repository;

    public Page<Vehicle> getAllEntities() {
        return (Page<Vehicle>) repository.findAll();
    }

//    public Page<Vehicle> getEntitiesByMakeYear(String year) {
//        return repository.findByMakeYearCustomQuery(year, null);
//    }


//    public Page<Vehicle> getVehiclesBySearchCriteria(QueryCriteria searchCriteria) {
//
//    }


//    public Page<Vehicle> searchSimilar(Vehicle entity, @Nullable String[] fields, Pageable pageable) {
//
////        Assert.notNull(entity, "Cannot search similar records for 'null'.");
////        Assert.notNull(pageable, "'pageable' cannot be 'null'");
//
//        MoreLikeThisQuery query = new MoreLikeThisQuery();
//        query.setId(stringIdRepresentation(extractIdFromBean(entity)));
//        query.setPageable(pageable);
//
//        if (fields != null) {
//            query.addFields(fields);
//        }
//
//        SearchHits<T> searchHits = execute(operations -> operations.search(query, entityClass, getIndexCoordinates()));
//        SearchPage<T> searchPage = SearchHitSupport.searchPageFor(searchHits, pageable);
//        return (Page<T>) SearchHitSupport.unwrapSearchHits(searchPage);
//    }
}
