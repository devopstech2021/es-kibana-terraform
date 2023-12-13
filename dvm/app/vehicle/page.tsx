"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Network, GaugeCircle } from "lucide-react";
import CarInfo from "../../modules/dashboard/types/CarData.types";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { getVehiclDetails } from "@/api/services/vehicle";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

// @ts-ignore
import ImageGallery from "react-image-gallery";

export default function Home() {
  const { toast } = useToast();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [vehicleDetails, setVehicleDetails] = useState<CarInfo>();

  useEffect(() => {
    const search = searchParams.get("id");
    console.log(search);
    if (search) {
      getCars(Number(search));
    } else {
      // push("/");
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
    // setIsLoadingCard(true);
    try {
      const res = await getVehiclDetails(id);
      console.log(res.data);
      if (res.data) {
        console.log(res.data);
        setVehicleDetails(res.data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    } finally {
      // setIsLoadingCard(false);
    }
  };

  return (
    <main className="min-h-screen mx-32 my-32">
      {vehicleDetails ? (
        <Card
          key={vehicleDetails.vehicle_id}
          className="w-[700px] h-[880px] mx-6 my-2"
        >
          <ImageGallery items={images} />

          <CardContent>
            <div className="flex flex-col mt-2 text-ellipsis">
              <div className="flex justify-between items-start h-24 text-ellipsis overflow-hidden">
                <div className="w-2/4">
                  <p className="text-blue-500 text-xl font-bold">
                    {vehicleDetails.make_year} {vehicleDetails.make}{" "}
                    {vehicleDetails.model}
                  </p>
                </div>
                <Separator orientation="vertical" className="mr-4" />
                <div className="w-1/3">
                  <p className="text-xl font-bold">
                    ${formatNumber(Number(vehicleDetails.selling_price))}
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
                    Dealer Name: : Micheal
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Dealer Contact: "+1_9900889989"
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Dealer Location: Michigan
                  </p>
                </div>
                <div className="flex flex-col items-center justify-between">
                  <div>
                    {vehicleDetails.category && (
                      <div className="flex">
                        <Badge
                          variant={"outline"}
                          className="ml-1"
                          key={vehicleDetails.vehicle_id}
                        >
                          {vehicleDetails.category}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div>
                    {vehicleDetails.fuel && (
                      <div className="flex mt-2">
                        <Badge
                          variant={"outline"}
                          className="ml-1"
                          key={vehicleDetails.vehicle_id}
                        >
                          {vehicleDetails.fuel}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mt-2">
                  City Mileage : {vehicleDetails.fuel_economy_city}
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Highway Mileage{vehicleDetails.fuel_economy_highway}
                </p>
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
