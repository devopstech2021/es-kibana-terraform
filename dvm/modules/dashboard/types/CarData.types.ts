interface CarApiResponse {
  total: number;
  page: number;
  limit: number;
  result: CarInfo[];
}

export default interface CarInfo {
  id: number | null;
  vin: string;
  year: number;
  make: string;
  model: string;
  series: string;
  bodyStyle: string;
  sellingPrice: number;
  mileage: number;
  exteriorColor: string;
  transmission: string;
  engine: string;
  drivetrain: string;
  valuationBookType: string;
  dealerName: string;
  dealerAddress1: string;
  dealerCity: string;
  dealerState: string;
  dealerZip: number;
  dealerId: string;
}
