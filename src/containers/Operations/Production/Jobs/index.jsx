import { useEffect } from "react";
import JobCard from "../../../../components/operations/Production/JobCard";
import useJobOrder from "../../../../hooks/useJobOrder";

function JobsContainer({ refresh, searchValue }) {
  const { getJobOrders, jobOrders } = useJobOrder();

  useEffect(() => {
    if (searchValue && searchValue.length) {
      getJobOrders(1, 10, `&archived=false&search=${searchValue}`);
    } else {
      getJobOrders(1, 10, "&archived=false");
    }
  }, [refresh, searchValue]);

  return (
    <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
      {jobOrders.map((job, index) => (
        <JobCard job={job} key={index} />
      ))}
    </div>
  );
}
export default JobsContainer;
