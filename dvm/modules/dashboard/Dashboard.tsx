import { useState, useEffect } from "react";
import CardContainer from "./CardContainer";
import FiltersContainer from "./FiltersContainer";
import { generateCars } from "@/api/services/dashboard";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { FormSubmitObject } from "@/api/services/dashboard";

function Dashboard() {
  const handleSubmit = (formValues: FormSubmitObject) => {
    getCars(formValues);
  };

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [carsData, setCarsData] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;

  useEffect(() => {
    const formValues = {
      yearMin: 1990,
      yearMax: 2023,
      priceMin: 1,
      priceMax: 999999,
      mileageMin: 1,
      mileageMax: 999999,
      items: [],
    };
    getCars(formValues);
  }, [currentPage, limit]);

  const getCars = (formValues: FormSubmitObject) => {
    setIsLoading(true);
    generateCars(formValues, false, currentPage, limit)
      .then((res) => {
        if (res) {
          console.log("response", res.data);
          setCarsData(res.data.result);
          setTotalPages(res.data.total);
          setIsLoading(false);
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <section className="mx-32 mt-10 flex">
      <FiltersContainer handleSubmit={handleSubmit} />
      <div className="flex flex-col w-3/4 justify-between">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {totalPages === 0 ? (
              <h1 className="mx-14 my-10">No results found ...</h1>
            ) : (
              <>
                <CardContainer carsData={carsData} />
                <div className="flex items-center self-center mb-4">
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
