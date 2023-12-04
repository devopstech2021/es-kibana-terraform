import React from "react";
import { FormData } from "./FiltersContainer";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface RangeFieldProps {
  label: string;
  nameMin: keyof FormData;
  nameMax: keyof FormData;
  placeholderMin: string;
  placeholderMax: string;
  form: UseFormReturn<FormData>;
}

function RangeField({
  label,
  nameMin,
  nameMax,
  placeholderMin,
  placeholderMax,
  form,
}: RangeFieldProps) {
  return (
    <>
      <p className="text-sm font-semibold my-2">{label}</p>
      <div className="flex items-center justify-between">
        <FormField
          control={form.control}
          name={nameMin}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-slate-500">
                {label} Min
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder={placeholderMin} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <p className="text-sm text-slate-800 mt-8 mx-4">to</p>
        </div>
        <FormField
          control={form.control}
          name={nameMax}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-slate-500">
                {label} Max
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder={placeholderMax} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}

export default RangeField;
