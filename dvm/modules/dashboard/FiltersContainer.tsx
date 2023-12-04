import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { car_types } from "@/common/constants";
import RangeField from "./RangeField";
import { Slider } from "@/components/ui/slider";
export interface FormData {
  make?: string;
  yearMin: number;
  yearMax: number;
  priceMin: number;
  priceMax: number;
  mileageMin: number;
  mileageMax: number;
  items?: string[];
}

const formSchema = z
  .object({
    make: z
      .string({
        required_error: "Please select an option",
      })
      .optional(),
    yearMin: z.coerce
      .number()
      .min(1000, {
        message: "Enter a valid min. year",
      })
      .max(9999),
    yearMax: z.coerce
      .number()
      .min(1000, {
        message: "Enter a valid max. year",
      })
      .max(9999),
    priceMin: z.coerce
      .number()
      .min(1, {
        message: "Enter a valid min. price",
      })
      .max(999999),
    priceMax: z.coerce
      .number()
      .min(1, {
        message: "Enter a valid max. price",
      })
      .max(999999),
    mileageMin: z.coerce
      .number()
      .min(1, {
        message: "Enter a valid min. mileage",
      })
      .max(999999),
    mileageMax: z.coerce
      .number()
      .min(1, {
        message: "Enter a valid max. mileage",
      })
      .max(999999),
    items: z.array(z.string()).optional(),
  })
  .refine((data) => data.priceMin <= data.priceMax, {
    message: "Min price cannot be greater than max price.",
  })
  .refine((data) => data.mileageMin <= data.mileageMax, {
    message: "Min mileage cannot be greater than max mileage.",
  });

interface Props {
  handleSubmit: (values: any) => void;
}

function FiltersContainer({ handleSubmit }: Props) {
  const [yearRange, setYearRange] = useState<number[]>([1990, 2024]);
  const handleYearChange = (value: number[]) => {
    setYearRange(value);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yearMin: 1990,
      yearMax: 2023,
      mileageMin: 1,
      mileageMax: 999999,
      priceMin: 1,
      priceMax: 999999,
      items: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.yearMin = yearRange[0];
    values.yearMax = yearRange[1];
    if (values.make === "all_types") {
      values.make = undefined;
    }
    handleSubmit(values);
  }

  return (
    <section className="border-2 border-slate-200 rounded-md w-1/4 px-6 py-4 mb-2 h-fit">
      <p className="text-lg font-semibold">Filters</p>
      <p className=" text-sm font-semibold mt-2">Make & Model</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <SelectItem value="all_types" defaultValue={"All Types"}>
                      All Types
                    </SelectItem>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-4" />
          <div className="mb-12">
            <p className="text-sm font-semibold my-2">Year</p>
            <Slider
              minStepsBetweenThumbs={1}
              max={2024}
              min={1990}
              step={1}
              value={yearRange}
              onValueChange={handleYearChange}
              formatLabel={(value) => `${value}`}
              className="my-4"
            />
          </div>

          <Separator className="my-4" />
          <RangeField
            label="Price"
            nameMin="priceMin"
            nameMax="priceMax"
            placeholderMin="1"
            placeholderMax="999999"
            form={form}
          />
          <Separator className="my-4" />

          <RangeField
            label="Mileage"
            nameMin="mileageMin"
            nameMax="mileageMax"
            placeholderMin="1"
            placeholderMax="999999"
            form={form}
          />
          <Separator className="my-4" />
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-sm font-semibold">Type</FormLabel>
                </div>
                {car_types.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? // @ts-ignore
                                    field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
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
          <div className="m-auto mt-6 flex justify-center">
            <Button
              variant={"outline"}
              className=" w-2/4"
              onClick={() => window.location.reload()}
            >
              Reset
            </Button>
            <Button type="submit" className="ml-4 w-2/4">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default FiltersContainer;
