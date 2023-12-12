import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toHex from 'colornames';
import { RotateCcw } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { convertJsonToArrayAndSort, formatNumber } from "@/common/utils";
import { Egg } from 'lucide-react';

export interface FormData {
  make?: string;
  model?: string;
  yearMin: number;
  yearMax: number;
  priceMin: number;
  priceMax: number;
  mileageMin: number;
  mileageMax: number;
  exteriorColors?: string[];
}

const formSchema = z
  .object({
    make: z
      .string({
        required_error: "Please select an make",
      })
      .optional(),
    model: z
      .string({
        required_error: "Please select an model",
      })
      .optional(),
    exteriorColors: z.array(z.string()).optional(),
  })

interface Props {
  handleSubmit: (values: any) => void;
  filtersData: any;
  makeValue: string;
  setMakeValue: (values: any) => void;
  modelValue: string;
  setModelValue: (values: any) => void;
  colors: any;
  setColors: (values: any) => void;
}

function FiltersContainer({
  handleSubmit,
  filtersData,
  makeValue,
  setMakeValue,
  modelValue,
  setModelValue,
  colors,
  setColors,
}: Props) {
  const yearMax = filtersData?.vehicleYear?.max || 2023;
  const yearMin = filtersData?.vehicleYear?.min || 1990;
  const [yearRange, setYearRange] = useState<number[]>([yearMin, yearMax]);
  const price = {
    min: filtersData?.price?.min || 1,
    max: filtersData?.price?.max || 999999,
  };
  const mileage = {
    min: filtersData?.milage?.min || 1,
    max: filtersData?.milage?.max || 999999,
  };
  const [priceRange, setPriceRange] = useState<number[]>([
    price.min,
    price.max,
  ]);
  const [mileageRange, setMileageRange] = useState<number[]>([
    mileage.min,
    mileage.max,
  ]);
  const vehicleMake = convertJsonToArrayAndSort(filtersData.make);
  const vehicleModel = convertJsonToArrayAndSort(filtersData.model);
  const vehicleColors = convertJsonToArrayAndSort(filtersData.colors);
  const handleYearChange = (value: number[]) => {
    onSubmit(form.getValues(), priceRange, value);
    setYearRange(value);
  };
  const handlePriceChange = (value: number[]) => {
    onSubmit(form.getValues(), value, yearRange);
    setPriceRange(value);
  };
  const handleMileageChange = (value: number[]) => {
    onSubmit(form.getValues(), priceRange, yearRange, value);
    setMileageRange(value);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exteriorColors: colors && colors.length > 0 ? colors : [],
      make: makeValue ? makeValue : undefined,
      model: modelValue ? modelValue : undefined,
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.watch((data) => {
      onSubmit(data);
    });
  }, [form.watch()]);

  function onSubmit(values: any, priceRange?: number[], yearRange?: any, mileageRange?: any) {
    const setRangeValues = (range: any, field: string) => {
      if (range && range.length > 0) {
        values[`${field}Min`] = range[0];
        values[`${field}Max`] = range[1];
      }
    };
  
    const setDropdownValue = (field: string) => {
      if (values[field] === "all_types") {
        values[field] = undefined;
      } else {
        field === "make" ? setMakeValue(values[field]) : setModelValue(values[field]);
      }
    };
  
    const setColorValues = () => {
      if (values.exteriorColors && values.exteriorColors.length > 0) {
        setColors(values.exteriorColors);
      } else {
        setColors([])
      }
    };
  
    setRangeValues(priceRange, 'price');
    setRangeValues(yearRange, 'year');
    setRangeValues(mileageRange, 'mileage');
  
    setDropdownValue('make');
    setDropdownValue('model');
    setColorValues();
    handleSubmit(values);
  }

  return (
    <section className="border-2 border-slate-200 rounded-md w-1/5 px-9 py-4 mb-2 h-fit">
      <p className="text-lg font-semibold">
        Filters{" "}
        <RotateCcw
          size={"18px"}
          className="inline ml-1 cursor-pointer"
          onClick={() => window.location.reload()}
        />
      </p>
      <p className=" text-sm font-semibold mt-2">Make & Model</p>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem className="mt-1">
                <FormLabel className="text-sm text-slate-500">Make</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="All Types"
                        defaultValue={"All Types"}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicleMake?.map((el: any) => (
                      <>
                        <SelectItem key={el.data} value={el.data}>
                          {el.data} ({el.value})
                        </SelectItem>
                      </>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {makeValue && (
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="mt-1">
                  <FormLabel className="text-sm text-slate-500">
                    Model
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="All Models"
                          defaultValue={"All Models"}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicleModel?.map((el: any) => (
                        <>
                          <SelectItem key={el.data} value={el.data}>
                            {el.data} ({el.value})
                          </SelectItem>
                        </>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Separator className="my-4" />
          <FormField
            control={form.control}
            name="exteriorColors"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-sm font-semibold">
                    Colors
                  </FormLabel>
                </div>
                {vehicleColors?.map((item) => (
                  <FormField
                    key={item.data}
                    control={form.control}
                    name="exteriorColors"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.data}
                          className="flex flex-row exteriorColors-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.data)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      // @ts-ignore
                                      ...field.value,
                                      item.data,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.data
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <Egg strokeWidth={20} className="inline mr-2 rounded-xl" size={"18px"} color={toHex(item.data)}/>
                            {item.data.charAt(0).toUpperCase()}
                            {item.data.slice(1)} ({item.value})
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-4" />
          <div className="mb-12">
            <p className="text-sm font-semibold my-2">Price</p>
            <Slider
              minStepsBetweenThumbs={1}
              max={price.max}
              min={price.min}
              step={100}
              value={priceRange}
              onValueCommit={handlePriceChange}
              formatLabel={(value) => `$${formatNumber(value)}`}
              className="my-4"
              disabled={price.min === price.max}
            />
          </div>

          <Separator className="my-4" />
          <div className="mb-12">
            <p className="text-sm font-semibold my-2">Year</p>
            <Slider
              minStepsBetweenThumbs={1}
              max={yearMax}
              min={yearMin}
              step={1}
              value={yearRange}
              onValueCommit={handleYearChange}
              formatLabel={(value) => `${value}`}
              className="my-4"
              disabled={yearMin === yearMax}
            />
          </div>
          <Separator className="my-4" />
          <div className="mb-12">
            <p className="text-sm font-semibold my-2">Mileage</p>
            <Slider
              minStepsBetweenThumbs={1}
              max={mileage.max}
              min={mileage.min}
              step={100}
              value={mileageRange}
              onValueCommit={handleMileageChange}
              formatLabel={(value) => `${formatNumber(value)}`}
              className="my-4"
              disabled={mileage.min === mileage.max}
            />
          </div>
        </form>
      </Form>
    </section>
  );
}

export default FiltersContainer;
