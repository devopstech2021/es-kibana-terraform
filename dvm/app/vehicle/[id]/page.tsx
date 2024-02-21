"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Network, GaugeCircle } from "lucide-react";
import CarInfo from "../../../modules/dashboard/types/CarData.types";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { getVehiclDetails } from "@/api/services/vehicle";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
// @ts-ignore
import ImageGallery from "react-image-gallery";

function VehicleDetails({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { toast } = useToast();
  const { push } = useRouter();
  const [vehicleDetails, setVehicleDetails] = useState<CarInfo>();

  useEffect(() => {
    if (params.id) {
      getCars(Number(params.id));
    } else {
      push("/");
    }
  }, []);
  const images = [
    {
      original:
        "https://img2.carmax.com/assets/24381541/hero.jpg?width=400&height=300",
    },
    {
      original:
        "https://img2.carmax.com/assets/24381541/image/21.jpg?width=400&height=300",
    },
    {
      original:
        "https://img2.carmax.com/assets/24381541/image/12.jpg?width=400&height=300",
    },
  ];

  const getCars = async (id: number) => {
    try {
      const res = await getVehiclDetails(id);
      console.log(res.data);
      if (res.data) {
        setVehicleDetails(res.data.content[0]);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    } finally {
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      {vehicleDetails ? (
        <Card key={vehicleDetails.id} className="w-[560px] h-[750px] mx-6 my-2">
          <ImageGallery items={images} />

          <CardContent>
            <div className="flex flex-col mt-2 text-ellipsis">
              <div className="flex justify-between items-start h-24 text-ellipsis overflow-hidden">
                <div className="w-2/4">
                  <p className="text-blue-500 text-xl font-bold">
                    {vehicleDetails.year} {vehicleDetails.make}{" "}
                    {vehicleDetails.model}
                  </p>
                </div>
                <Separator orientation="vertical" className="mr-4" />
                <div className="w-1/3">
                  <p className="text-xl font-bold">
                    ${formatNumber(Number(vehicleDetails.sellingPrice))}
                  </p>
                </div>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-baseline mt-2">
                <div>
                  <p className="text-sm text-slate-500">
                    <Network className="h-4 w-4 inline mr-2 mb-1" />
                    {formatNumber(Number(vehicleDetails.mileage))} miles
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    <GaugeCircle className="h-4 w-4 inline mr-2 mb-1" />
                    {vehicleDetails.transmission}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mt-2">
                    Dealer Name: : {vehicleDetails.dealerName}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Dealer Contact: {vehicleDetails.dealerAddress1}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Dealer State: {vehicleDetails.dealerState}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-between">
                  <div>
                    {vehicleDetails.engine && (
                      <div className="flex">
                        <Badge
                          variant={"outline"}
                          className="ml-1"
                          key={vehicleDetails.id}
                        >
                          {vehicleDetails.engine}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div>
                    {vehicleDetails.series && (
                      <div className="flex mt-2">
                        <Badge
                          variant={"outline"}
                          className="ml-1"
                          key={vehicleDetails.id}
                        >
                          {vehicleDetails.series}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Button className="bg-warning text-white ">Buy</Button>
                <Button
                  className="bg-warning text-white ml-6"
                  onClick={() => push("/")}
                >
                  Listing page
                </Button>
              </div>{" "}
              <div className="flex justify-center mt-4"></div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-2">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </>
      )}
    </main>
  );
}

export default VehicleDetails;
