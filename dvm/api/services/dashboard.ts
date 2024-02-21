import HttpClient from "../axios";

export interface FormSubmitObject {
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMin?: number;
  mileageMax?: number;
  exteriorColors?: string[];
  make?: string;
}

interface GenerateQueryParams {
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMin?: number;
  mileageMax?: number;
  exteriorColors?: string[];
  sellingPrice?: boolean;
  make?: string;
  page?: number;
  limit?: number;
  model?: string
}

const generateQuery = (params: GenerateQueryParams) => {
  const {
    sellingPrice,
    page,
    limit,
    make,
    priceMin,
    priceMax,
    mileageMin,
    mileageMax,
    yearMin,
    yearMax,
    exteriorColors,
    model
  } = params;
  const query: any = {
    query: {},
    sort: sellingPrice ? { selling_price: "Asc" } : {},
    page: page || 1,
    limit: limit || 1,
  };

  if (make) {
    query.query.make = {
      type: "regx",
      value: make,
    };
  }

  if (model) {
    query.query.model = {
      type: "regx",
      value: model,
    };
  }

  const addRangeQuery = (
    fieldName: string,
    minValue?: number,
    maxValue?: number,
    defaultValueMin: number = 1,
    defaultValueMax: number = 999999
  ) => {
    if (minValue !== undefined || maxValue !== undefined) {
      query.query[fieldName] = {
        type: "range",
        value: {
          from: minValue || defaultValueMin,
          to: maxValue || defaultValueMax,
        },
      };
    }
  };

  addRangeQuery("selling_price", priceMin, priceMax, 1, 999999);
  addRangeQuery("mileage", mileageMin, mileageMax, 1, 999999);
  addRangeQuery("make_year", yearMin, yearMax, 1990, 2023);

  if (exteriorColors !== undefined && exteriorColors.length > 0) {
    query.query.exterior_color = {
      type: "Array",
      value: exteriorColors,
    };
  }

  return query;
};

export const retrieveCars = async (
  formSubmitObject: FormSubmitObject,
  sellingPrice?: boolean,
  page?: number,
  limit?: number
) => {
  const queryParams = generateQuery({
    ...formSubmitObject,
    sellingPrice,
    page,
    limit,
  });

  return HttpClient.post(
    `${process.env.NEXT_PUBLIC_BASE_ENDPOINT}/vehicle-search-engine/vehicle/search`,
    {
      start: page,
      length: limit
    }
  );
};
export const getFilterData = async (
  formSubmitObject: FormSubmitObject,
  sellingPrice?: boolean,
  page?: number,
  limit?: number
) => {
  const queryParams = generateQuery({
    ...formSubmitObject,
    sellingPrice,
    page,
    limit,
  });

  return HttpClient.post(
    `${process.env.NEXT_PUBLIC_BASE_ENDPOINT}/vehicle-search-engine/vehicle/facets`,
    {"pageSize": 5,
    "start": 10,
    "length": 10}
  );
};
