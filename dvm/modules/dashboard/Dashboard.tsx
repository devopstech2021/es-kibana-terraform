import { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import FiltersContainer from "./FiltersContainer";
import { retrieveCars, getFilterData } from "@/api/services/dashboard";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { FormSubmitObject } from "@/api/services/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { resultsPerPage } from "@/common/constants";

function Dashboard() {
  const { toast } = useToast();
  const [isLoadingFilters, setIsLoadingFilters] = useState<boolean>(true);
  const [isLoadingCard, setIsLoadingCard] = useState<boolean>(true);
  const [carsData, setCarsData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [makeValue, setMakeValue] = useState("");
  const [modelValue, setModelValue] = useState("");
  const [colors, setColors] = useState([]);
  const [filterData, setFilterData] = useState({});

  const [formValues, setFormValues] = useState({
    yearMin: 1990,
    yearMax: 2023,
    priceMin: 1,
    priceMax: 999999,
    mileageMin: 1,
    mileageMax: 999999,
    exteriorColors: [],
  });
  const limit = resultsPerPage;

  useEffect(() => {
    getAggregateData(formValues, currentPage);
  }, []);

  const getCars = async (formValues: FormSubmitObject, pageNo: number) => {
    setIsLoadingCard(true);
    try {
      const res = await retrieveCars(formValues, false, pageNo, limit);
      if (res.data) {
        setCarsData(res.data.result);
        setTotalPages(Math.ceil(res.data.total / limit));
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    } finally {
      setTimeout(() => {
        setIsLoadingCard(false);
      }, 300);
    }
  };
  const getAggregateData = async (
    formValues: FormSubmitObject,
    pageNo: number,
    filterSubmit: boolean = false
  ) => {
    setIsLoadingFilters(true);
    try {
      const res = await getFilterData(formValues, false, pageNo, limit);
      if (res.data) {
        setFormValues((prevValues: any) => ({
          ...prevValues,
          yearMin: res.data.vehicleYear.min,
          yearMax: res.data.vehicleYear.max,
          priceMax: res.data.price.max,
          priceMin: res.data.price.min,
          mileageMax: res.data.milage.max,
          mileageMin: res.data.milage.min,
        }));
        setFilterData(res.data);
        if (res.data.total.total_vehicles === 0) {
          setTotalPages(0);
        } else {
          if (filterSubmit) {
            getCars(formValues, pageNo);
          } else {
            getCars(
              {
                yearMin: res.data.vehicleYear.min,
                yearMax: res.data.vehicleYear.max,
                priceMax: res.data.price.max,
                priceMin: res.data.price.min,
                mileageMax: res.data.milage.max,
                mileageMin: res.data.milage.min,
              },
              pageNo
            );
          }
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    } finally {
      setTimeout(() => {
        setIsLoadingFilters(false);
      }, 300);
    }
  };

  const handleFormSubmit = (formValues: FormSubmitObject) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      ...formValues,
    }));
    setCurrentPage(1);
    getAggregateData(formValues, 1, true);
  };

  const handlePageChange = (newPage: number) => {
    getCars(formValues, newPage);
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <section className="mx-32 mt-10 flex">
      {isLoadingFilters ? (
        <div className="flex exteriorColors-center space-x-4 h-full justify-center">
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
        </div>
      ) : (
        <FiltersContainer
          handleSubmit={handleFormSubmit}
          filtersData={filterData}
          makeValue={makeValue}
          setMakeValue={setMakeValue}
          modelValue={modelValue}
          setModelValue={setModelValue}
          colors={colors}
          setColors={setColors}
        />
      )}
      <div className="w-3/4">
        {isLoadingCard ? (
          <div className="flex exteriorColors-center space-x-4 h-full justify-center">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-[250px]" />
              <Skeleton className="h-6 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <>
            {totalPages === 0 ? (
              <>
                <h1 className="mx-14 mt-10">No results found...</h1>

                <Button
                  className="ml-14 mt-4"
                  onClick={() => window.location.reload()}
                >
                  Clear All filters
                </Button>
              </>
            ) : (
              <>
                <CardContainer carsData={carsData} />
                <div className="flex exteriorColors-center justify-center mb-4 mt-6">
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="mx-4 mt-2">{`Page ${currentPage} of ${totalPages}`}</span>
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
