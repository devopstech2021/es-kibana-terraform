import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Network, GaugeCircle } from "lucide-react";
import CarInfo from "./types/CarData.types";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { useRouter } from 'next/navigation'

interface Props {
  carsData: CarInfo[];
}

function CardContainer({ carsData }: Props) {
  const router = useRouter()
  function getCarImage(color: string) {
    const colorsImagesAvailable = [
      "aqua",
      "black",
      "blue",
      "fuchsia",
      "gray",
      "green",
      "maroon",
      "navy",
      "purple",
      "silver",
      "teal",
      "white",
      "yellow",
    ];
    if (colorsImagesAvailable.includes(color)) {
      const path = `/cars/${color}/${Math.floor(Math.random() * 4) + 1}.webp`;
      return path;
    }

    return `/cars/${
      colorsImagesAvailable[
        Math.floor(Math.random() * colorsImagesAvailable.length)
      ]
    }/${Math.floor(Math.random() * 4) + 1}.webp`;
  }
  return (
    <>
      <div className="flex flex-wrap ml-8">
        {carsData &&
          carsData.length !== 0 &&
          carsData.map((car: CarInfo) => (
            <Card
              key={car.id}
              className="w-[360px] h-[630px] mx-6 my-2"
            >
              <Image
                className=""
                src={getCarImage(car.exteriorColor)}
                width={360}
                height={400}
                alt="Car Image"
                priority
              />

              <CardContent>
                <div className="flex flex-col mt-2 text-ellipsis">
                  <div className="flex justify-between items-start h-24 text-ellipsis overflow-hidden">
                    <div className="w-2/4">
                      <p className="text-blue-500 text-xl font-bold">
                        {car.year} {car.make} {car.model}
                      </p>
                    </div>
                    <Separator orientation="vertical" className="mr-4" />
                    <div className="w-1/3">
                      <p className="text-xl font-bold">
                        ${formatNumber(Number(car.sellingPrice))}
                      </p>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="text-sm text-slate-500">
                        <Network className="h-4 w-4 inline mr-2 mb-1" />
                        {formatNumber(Number(car.mileage))} miles
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        <GaugeCircle className="h-4 w-4 inline mr-2 mb-1" />
                        {car.transmission}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                      <div>
                        {car.engine && (
                          <div className="flex">
                            <Badge
                              variant={"outline"}
                              className="ml-1"
                              key={car.id}
                            >
                              {car.engine}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div>
                        {car.series && (
                          <div className="flex mt-2">
                            <Badge
                              variant={"outline"}
                              className="ml-1"
                              key={car.id}
                            >
                              {car.series}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <Button
                      className="bg-warning text-white"
                     
                      onClick={() => router.push(`/vehicle/${car.id}`)}
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
