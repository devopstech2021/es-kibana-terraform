import HttpClient from "../axios";


export const getVehiclDetails = async (vehicleId: number) => {
  return HttpClient.post(
    `${process.env.NEXT_PUBLIC_BASE_ENDPOINT}/vehicle-search-engine/vehicle/search`,
    {
      id: vehicleId
    }
  );
};