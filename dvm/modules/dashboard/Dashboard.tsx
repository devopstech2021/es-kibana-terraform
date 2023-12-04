import { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import FiltersContainer from "./FiltersContainer";
import { generateCars } from "@/api/services/dashboard";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { FormSubmitObject } from "@/api/services/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { resultsPerPage } from "@/common/constants";

function Dashboard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [carsData, setCarsData] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [formValues, setFormValues] = useState({
    yearMin: 1990,
    yearMax: 2023,
    priceMin: 1,
    priceMax: 999999,
    mileageMin: 1,
    mileageMax: 999999,
    items: [],
  });
  const limit = resultsPerPage;

  useEffect(() => {
    getCars(formValues, currentPage);
  }, []);

  const handleSubmit = (formValues: FormSubmitObject) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      ...formValues,
    }));
    setCurrentPage(1);
    getCars(formValues, 1);
  };

  const getCars = (formValues: FormSubmitObject, pageNo: number) => {
    setIsLoading(true);
    generateCars(formValues, false, pageNo, limit)
      .then((res) => {
        if (res) {
          console.log("response", res.data);
          setCarsData(res.data.result);
          setTotalPages(Math.ceil(res.data.total / limit));
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      });
  };
  const handlePageChange = (newPage: number) => {
    getCars(formValues, newPage);
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <section className="mx-32 mt-10 flex">
      <FiltersContainer handleSubmit={handleSubmit} />
      <div className="w-3/4">
        {isLoading ? (
          <div className="flex items-center space-x-4 h-full justify-center">
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
              <h1 className="mx-14 my-10">No results found ...</h1>
            ) : (
              <>
                <CardContainer carsData={carsData} />
                <div className="flex items-center justify-center mb-4 mt-6">
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
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
