import HttpClient from "../axios";


export const getVehiclDetails = async (vehicleId: number) => {
  return HttpClient.get(
    `${process.env.NEXT_PUBLIC_BASE_ENDPOINT}/inventory/v1/vehicles/${vehicleId}`
  );
};
