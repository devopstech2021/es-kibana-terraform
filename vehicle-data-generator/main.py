import json
import random
import numpy as np

from faker import Faker
from faker_vehicle import VehicleProvider

fake = Faker()
fake.add_provider(VehicleProvider)
fuel_type = ["Gasoline", "Diesel"]
transmission_list = ['Automatic', 'Manual']
dealer_count = 1000


def generate_data(count):
    for i in range(0, count):
        vehicle = fake.vehicle_object()
        vehicle.update({"veh_id": i+1})
        vehicle.update({"dealer_id": random.randint(1, dealer_count)})
        vehicle.update({"vin": fake.vin()})
        vehicle.update({"mileage": random.randint(10000, 50000)})
        vehicle.update({"lat_lon": fake.local_latlng()})
        vehicle.update({"color": fake.safe_color_name()})
        vehicle.update({"price": random.randint(10000, 23000)})
        vehicle.update({"fuel": np.random.choice(fuel_type, p=[0.90, 0.10])})
        vehicle.update({"transmission": np.random.choice(transmission_list, p=[0.95, 0.05])})
        vehicle.update({"fuel_economy_highway": np.random.choice(transmission_list, p=[0.95, 0.05])})

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
    count = 5
    generate_data(count)


main()
