package com.ca.originations.models.requests;

import co.elastic.clients.elasticsearch._types.query_dsl.Query;

public interface ESQuery {
    Query getQuery(String attribute) throws Exception;
}
