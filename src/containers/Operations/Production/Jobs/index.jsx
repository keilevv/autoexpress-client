import JobCard from "../../../../components/operations/Production/JobCard";
function JobsContainer() {
  const mockData = [
    {
      work_order: "002",
      status: "En progreso",
      due_date: "2022-05-01",
      operator: "Carlos",
      car_plate: "AAA111",
    },
    {
      work_order: "002",
      status: "En progreso",
      due_date: "2022-05-01",
      operator: "Carlos",
      car_plate: "AAA111",
    },
    {
      work_order: "002",
      status: "En progreso",
      due_date: "2022-05-01",
      operator: "Carlos",
      car_plate: "AAA111",
    },
    {
      work_order: "002",
      status: "En progreso",
      due_date: "2022-05-01",
      operator: "Carlos",
      car_plate: "AAA111",
    },
    {
        work_order: "002",
        status: "En progreso",
        due_date: "2022-05-01",
        operator: "Carlos",
        car_plate: "AAA111",
      },
  ];
  return (
    <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
      {mockData.map((job, index) => (
        <JobCard job={job} key={index} />
      ))}
    </div>
  );
}
export default JobsContainer;
