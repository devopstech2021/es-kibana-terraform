# Inventory Search Service

## Elasticsearch data Ingestion

### Option 1: Postman Collection  
*ES.postman_collection.json* file contains the postman collection to ingest the data into Elasticsearch cluster.  
The collection contains request to create index, put index mapping, insert sample data. It also contains the API Contract for Search and Aggregation.  
The username and password can be changed in the collection. Also if you have Elasticsearch setup with *Without SSL Support* then you can change the protocol to http. 
<br>

### Option 2: Curl Commands
*Use the following curl commands to insert test data into the Elasticsearch cluster.  The first command will create the index and the second command will insert the test data.*
<br>
```
curl --location --request PUT 'https://localhost:9200/vehicle/_doc/3' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic ZWxhc3RpYzpYblhuT3lYVF9MaFpXc3VTQVFEVw==' \
--data '{
                    "vehicle_id": 12534,
                    "dealer_id": "xyzDealer1",
                    "vin": "vin_4",
                    "make_year": 2022,
                    "selling_price": 80000,
                    "make": "Jeep",
                    "model": "Grand Cherokee",
                    "mileage": 10000,
                    "category": "SUV",
                    "exterior_color": "black",
                    "creation_dt": "2023-11-21",
                    "location": {
                        "lon": -86.3580,
                        "lat": 39.5743
                    },
                    "zipcode": 46158,
                    "fuel": "Gasoline",
                    "interior_color": "Red",
                    "transmission": "Automatic 8-Speed",
                    "fuel_economy_highway": 25,
                    "fuel_economy_city": 18                    
                }'
                
curl --location --request PUT 'https://localhost:9200/vehicle/_doc/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic ZWxhc3RpYzpYblhuT3lYVF9MaFpXc3VTQVFEVw==' \
--data '{
                    "vehicle_id": 124345,
                    "dealer_id": "xyzDealer",
                    "vin": "vin_2",
                    "make_year": 2015,
                    "selling_price": 60000,
                    "make": "Jeep",
                    "category": "Sedan",
                    "model": "Grand Cherokee",
                    "mileage": 2000,
                    "exterior_color": "red",
                    "creation_dt": "2021-11-21",
                    "location": {
                        "lon": -84.7942,
                        "lat": 44.2998
                    },
                    "zipcode": 48629,
                    "fuel": "Diesel",
                    "interior_color": "black",
                    "transmission": "Automatic 8-Speed",
                    "fuel_economy_highway": 15,
                    "fuel_economy_city": 10                    
                }'
```

## API Contracts
### Search Vehicle API Request

```
curl --location 'http://localhost:8080/inventory/v1/vehicles/search' \
--header 'Content-Type: application/json' \
--data '{
  "query": {   
          
    "selling_price": {
      "type": "range",
      "value": {
        "from": 1,
        "to": 200000001
      }
    },
    "mileage": {
      "type": "range",
      "value": {
        "from": 1,
        "to": 20001
      }
    },
    "makeYear": {
      "type": "Array",
      "value": [
        2010,
        2011,
        2012
      ]
    }
  },
  "sort": {
    "selling_price": "Asc"
  },
  "page": 1,  
  "limit": 1
}'
```
### RESPONSE
```
{
    "total": 3,
    "page": 1,
    "limit": 1,
    "result": [
        {
            ...
        }
    ]
}
```

### Aggregation API Request
```
curl --location 'http://localhost:8080/inventory/v1/vehicles/aggregates' \
--header 'Content-Type: application/json' \
--data '{
    "query": {
        "selling_price": {
            "type": "range",
            "value": {
                "from": 1,
                "to": 200000001
            }
        },
        "mileage": {
            "type": "range",
            "value": {
                "from": 1,
                "to": 20001
            }
        },
        "vehicleYear": {
            "type": "Array",
            "value": [
                2010,
                2015,
                2012,
                2022
            ]
        }
    },
    "page": 1,
    "sort": {
        "selling_price": "Desc"
    },
    "limit": 5
}'
``` 

### RESPONSE
```
{
    "total": {
        "total": 29
    },
    "vehicleYear": {
        "min": 2010.0,
        "max": 2020.0
    },
    "price": {
        "min": 10664.0,
        "max": 22999.0
    },
    "model": {
        "Escape": 1,
        "Envoy": 1,
        ...
    },
    "make": {
        "Acura": 2,
        ...
    },
    "colors": {
        "aqua": 3,
        "fuchsia": 2,
        ...
    }
}
```