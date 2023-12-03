import HttpClient from "../axios";

export interface FormSubmitObject {
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMin?: number;
  mileageMax?: number;
  items?: string[];
  make?: string;
}

interface GenerateQueryParams {
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMin?: number;
  mileageMax?: number;
  items?: string[];
  sellingPrice?: boolean;
  make?: string;
  page?: number;
  limit?: number;
}

const generateQuery = (params: GenerateQueryParams): any => {
  const query: any = {
    query: {},
    sort: {},
    page: 1,
    limit: 1,
  };

  if (params.sellingPrice) {
    query.sort.selling_price = "Asc";
  }
  if (params.page) {
    query.page = params.page;
  }
  if (params.limit) {
    query.limit = params.limit;
  }
  

  if (params.make) {
    query.query.make = {
      type: "regx",
      value: params.make,
    };
  }

  if (params.priceMin !== undefined || params.priceMax !== undefined) {
    query.query.selling_price = {
      type: "range",
      value: {
        from: params.priceMin || 1,
        to: params.priceMax || 999999,
      },
    };
  }

  if (params.mileageMin !== undefined || params.mileageMax !== undefined) {
    query.query.mileage = {
      type: "range",
      value: {
        from: params.mileageMin || 1,
        to: params.mileageMax || 999999,
      },
    };
  }

  if (params.yearMin !== undefined || params.yearMax !== undefined) {
    query.query.make_year = {
      type: "range",
      value: {
        from: params.yearMin || 1900,
        to: params.yearMax || 2023,
      },
    };
  }

  if (params.items !== undefined && params.items.length > 0) {
    query.query.items = {
      type: "Array",
      value: params.items,
    };
  }

  return query;
};

export const generateCars = async (
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
    `${process.env.NEXT_PUBLIC_BASE_ENDPOINT}/inventory/v1/vehicles/search`,
    queryParams
  );
};
