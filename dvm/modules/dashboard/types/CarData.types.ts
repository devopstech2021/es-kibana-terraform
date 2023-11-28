interface CarApiResponse {
  total: number;
  page: number;
  limit: number;
  result: ResultItem[];
}

export default interface ResultItem {
  id: null | string;
  vin: string;
  name: string;
  description: string;
  make: string;
  model: string;
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
  vehicle_year: number;
  selling_price: number;
  exterior_color: string;
  creation_dt: string;
  interior_color: string;
  fuel_economy_highway: number;
  fuel_economy_city: number;
  premium_features: string[];
}
