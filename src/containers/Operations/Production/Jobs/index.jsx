import { useEffect } from "react";
import { Spin } from "antd";
import JobCard from "../../../../components/operations/Production/JobCard";
import useJobOrder from "../../../../hooks/useJobOrder";

function JobsContainer({ refresh, searchValue }) {
  const { getJobOrders, jobOrders, loading } = useJobOrder();

  useEffect(() => {
    if (searchValue && searchValue.length) {
      getJobOrders(1, 10, `&archived=false&search=${searchValue}`);
    } else {
      getJobOrders(1, 10, "&archived=false");
    }
  }, [refresh, searchValue]);

  return (
    <div>
      {loading ? (
        <Spin size="large" className="my-10 w-full" />
      ) : (
        <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
          {jobOrders.map((job, index) => (
            <JobCard job={job} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
export default JobsContainer;
