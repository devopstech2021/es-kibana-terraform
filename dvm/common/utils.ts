import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (value: number) => {
  const nf = new Intl.NumberFormat("en-US");
  return nf.format(value);
};


export const convertJsonToArrayAndSort = (data: any) => {
  if (data) {
    const result = Object.keys(data).map((key) => ({
      data: key,
      value: data[key],
    }));
    return result.length > 0
      ? result.sort(function (a, b) {
          return a.data.localeCompare(b.data);
        })
      : [];
  }
};
