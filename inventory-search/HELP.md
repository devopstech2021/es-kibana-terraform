# Inventory Search Service


***Insert Test Data***
<br>
Use the following curl commands to insert test data into the Elasticsearch cluster.  The first command will create the index and the second command will insert the test data.
```
curl --location --request PUT 'https://localhost:9200/cars/_doc/3' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic ZWxhc3RpYzpYblhuT3lYVF9MaFpXc3VTQVFEVw==' \
--data '{
                    "vehicle_id": 12534,
                    "dealer_id": "xyzDealer1",
                    "vin": "vin_4",
                    "name": "2022 Jeep Grand Cherokee",
                    "description": "4x4 Laredo X 4dr SUV",
                    "vehicle_year": 2022,
                    "selling_price": 80000,
                    "make": "Jeep",
                    "model": "Grand Cherokee",
                    "mileage": 10000,
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
                    "fuel_economy_city": 18,
                    "premium_features": [
                        "Remote Start",
                        "Good MPG"
                    ]
                }'
                
curl --location --request PUT 'https://localhost:9200/cars/_doc/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic ZWxhc3RpYzpYblhuT3lYVF9MaFpXc3VTQVFEVw==' \
--data '{
                    "vehicle_id": 124345,
                    "dealer_id": "xyzDealer",
                    "vin": "vin_2",
                    "name": "2022 Jeep Grand Cherokee",
                    "description": "4x2 Laredo X 4dr SUV",
                    "vehicle_year": 2015,
                    "selling_price": 60000,
                    "make": "Jeep",
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
                    "fuel_economy_city": 10,
                    "premium_features": [
                        "Remote Start",
                        "Good MPG"
                    ]
                }'
```
*Curl command for Searching the vehicles*

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
** RESPONSE **
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

