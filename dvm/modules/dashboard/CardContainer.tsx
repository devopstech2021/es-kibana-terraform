import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Network, GaugeCircle } from "lucide-react";
import CarApiResponse from "./types/CarData.types";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  carsData: CarApiResponse[];
}

function CardContainer({ carsData }: Props) {
  const { toast } = useToast();
  return (
    <>
      <div className="flex flex-wrap">
        {carsData &&
          carsData.length !== 0 &&
          carsData.map((car: CarApiResponse) => (
            <Card
              key={car.vehicle_id}
              className="w-[350px] h-[630px] mx-6 my-2"
            >
              <Image
                className=""
                src={`/cars/${Math.floor(Math.random() * 10) + 1}.webp`}
                width={350}
                height={350}
                alt="Car Image"
                priority
              />

              <CardContent>
                <div className="flex flex-col mt-2 text-ellipsis">
                  <div className="flex justify-between items-start h-24">
                    <div className="w-2/4">
                      <p className="text-blue-500 text-2xl font-bold text-ellipsis overflow-hidden">
                        {car.make}
                        {" "}
                        {car.model}
                      </p>
                    </div>
                    <Separator orientation="vertical" className="mr-4" />
                    <div className="w-1/3">
                      <p className="text-2xl font-bold">
                        ${formatNumber(Number(car.selling_price))}
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div>
                    <p className="text-sm text-slate-500">
                      <Network className="h-4 w-4 inline mr-2 mb-1" />
                      {formatNumber(Number(car.mileage))} miles
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      <GaugeCircle className="h-4 w-4 inline mr-2 mb-1" />
                      {car.transmission}cyl Automatic
                    </p>
                  </div>
                  {/*car.premium_features.length !== 0 && (
                    <div className="flex mt-2">
                      {car.premium_features.map((feature: string) => (
                        <Badge
                          variant={"outline"}
                          className="ml-1"
                          key={feature}
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  )*/} 
                  <div className="flex justify-center mt-4">
                    <Button
                      className="bg-warning text-white"
                      onClick={() => {
                        toast({
                          description: "Feature under development",
                        });
                      }}
                    >
                      Check Deal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
}

export default CardContainer;
