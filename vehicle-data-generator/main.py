import json
import random
import numpy as np
from datetime import date

from faker import Faker
from faker_vehicle import VehicleProvider

fake = Faker()
fake.add_provider(VehicleProvider)
fuel_type = ["Gasoline", "Diesel"]
transmission_list = ['Automatic', 'Manual']
dealer_count = 1000


def update_json_field(json_obj, old_field, new_field):
    json_obj.update({new_field: json_obj[old_field]})
    del json_obj[old_field]


def generate_data(count):
    for i in range(0, count):
        vehicle = fake.vehicle_object()

        vehicle.update({"vehicle_id": i+1})
        vehicle.update({"dealer_id": random.randint(1, dealer_count)})
        vehicle.update({"vin": fake.vin()})

        update_json_field(vehicle, "Year", "make_year")
        update_json_field(vehicle, "Make", "make")
        update_json_field(vehicle, "Model", "model")
        update_json_field(vehicle, "Category", "category")

        vehicle.update({"mileage": random.randint(10000, 50000)})

        vehicle.update({"lat_lon": fake.local_latlng()})
        location = json.loads("{}")
        location.update({"lat": vehicle['lat_lon'][0]})
        location.update({"lon": vehicle['lat_lon'][1]})
        del vehicle["lat_lon"]
        vehicle.update({"location": location})

        vehicle.update({"exterior_color": fake.safe_color_name()})
        vehicle.update({"selling_price": random.randint(10000, 23000)})
        vehicle.update({"fuel": np.random.choice(fuel_type, p=[0.90, 0.10])})
        vehicle.update({"transmission": np.random.choice(transmission_list, p=[0.95, 0.05])})
        fuel_economy = random.randint(10, 25)
        vehicle.update({"fuel_economy_highway": fuel_economy})
        vehicle.update({"fuel_economy_city": fuel_economy - 4})
        vehicle.update({"creation_dt": date.today().strftime("%Y-%m-%d")})

        _id = json.loads("{}")
        _id.update({"_id": i+1})
        index = json.loads("{}")
        index.update({"index": _id})

        with open("vehicles.json", "a") as outfile:
            outfile.write(json.dumps(index))
            outfile.write("\n")
            outfile.write(json.dumps(vehicle))
            outfile.write("\n")


def main():
    count = 100
    generate_data(count)


main()
