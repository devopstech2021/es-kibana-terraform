interface CarApiResponse {
  total: number;
  page: number;
  limit: number;
  result: CarInfo[];
}

export default interface CarInfo {
  id: number | null;
  vin: string;
  make: string;
  model: string;
  category: string;
  mileage: number;
  location: {
    lon: number;
    lat: number;
  };
  zipcode: number;
  fuel: string;
  transmission: string;
  vehicle_id: number;
  dealer_id: string;
  make_year: number;
  selling_price: number;
  exterior_color: string;
  creation_dt: string;
  interior_color: string | null;
  fuel_economy_highway: number;
  fuel_economy_city: number;
}
