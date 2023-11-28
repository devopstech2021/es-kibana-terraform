import React, { useEffect } from "react";
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
import { Input } from "@/components/ui/input";
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
    items: z
      .array(z.string())
      .optional(),
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
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="bmm">BMW</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-4" />
          <p className="text-sm font-semibold mb-2">Year</p>
          <div className="flex items-center justify-between">
            <div>
              <FormField
                control={form.control}
                name="yearMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-500">
                      Year Min
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1990" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <p className="text-sm text-slate-800 mt-8 mx-4">to</p>
            </div>
            <div>
              <FormField
                control={form.control}
                name="yearMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-500">
                      Year Max
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2023" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Separator className="my-4" />
          <p className="text-sm font-semibold mb-2">Price</p>
          <div className="flex items-center justify-between">
            <div>
              <FormField
                control={form.control}
                name="priceMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-500">
                      Price Min
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <p className="text-sm text-slate-800 mt-8 mx-4">to</p>
            </div>
            <div>
              <FormField
                control={form.control}
                name="priceMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-500">
                      Price Max
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="989000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
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
                                // @ts-ignore
                                  ? field.onChange([...field.value, item.id])
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
          <p className="text-sm font-semibold mb-2">Mileage</p>
          <div className="flex items-center justify-between">
            <div>
              <FormField
                control={form.control}
                name="mileageMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-500">
                      Min
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1990" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <p className="text-sm text-slate-800 mt-8 mx-4">to</p>
            </div>
            <div>
              <FormField
                control={form.control}
                name="mileageMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-500">
                      Max
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2023" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
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
