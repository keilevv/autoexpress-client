import { useState, useEffect, useCallback, useRef } from "react";
import { Button, List, Form, Tag, Spin } from "antd";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import useEmployee from "../../../../../hooks/useEmployee";
import NewEmployeeModal from "./NewEmployeeModal";
import { employeeRolesOptions } from "../../../../../helpers/constants";
import "./style.css";

const DEFAULT_PAGE_SIZE = 10;

function EmployeesList({ isSelect, setPayload, payload }) {
  const { getEmployees, employees, loading, count } = useEmployee();
  const user = useSelector((state) => state.auth.user);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userIsADOperator = user.roles.includes("autodetailing-operator");

  const [page, setPage] = useState(1);
  const [employeeList, setEmployeeList] = useState([]);
  const isFetchingRef = useRef(false);
  const listContainerRef = useRef(null);

  const filterQuery = userIsADOperator ? "&owner=autodetailing" : "";
  const hasMore = employeeList.length < count;
  const isInitialLoading = loading && page === 1;
  const isLoadingMore = loading && page > 1;

  useEffect(() => {
    setPage(1);
    setEmployeeList([]);
  }, [filterQuery]);

  useEffect(() => {
    let didCancel = false;

    if (!user) {
      return () => {
        didCancel = true;
      };
    }

    isFetchingRef.current = true;

    getEmployees(page, DEFAULT_PAGE_SIZE, filterQuery).finally(() => {
      if (!didCancel) {
        isFetchingRef.current = false;
      }
    });

    return () => {
      didCancel = true;
    };
  }, [page, filterQuery, user, getEmployees]);

  useEffect(() => {
    if (page === 1) {
      setEmployeeList([...employees]);
      return;
    }

    if (!employees.length) {
      return;
    }

    setEmployeeList((prevList) => {
      const existingIds = new Set(prevList.map((item) => item._id));
      const newItems = employees.filter((item) => !existingIds.has(item._id));
      return [...prevList, ...newItems];
    });
  }, [employees, page]);

  const handleLoadMore = useCallback(() => {
    if (isFetchingRef.current || !hasMore || loading) {
      return;
    }

    isFetchingRef.current = true;
    setPage((prevPage) => prevPage + 1);
  }, [hasMore, loading]);

  const handleScroll = useCallback(
    (event) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      const threshold = 120;

      if (scrollHeight - scrollTop - clientHeight <= threshold) {
        handleLoadMore();
      }
    },
    [handleLoadMore]
  );

  const handleEmployeeModalFinish = useCallback(() => {
    setPage(1);
    setEmployeeList([]);
    isFetchingRef.current = true;
    getEmployees(1, DEFAULT_PAGE_SIZE, filterQuery).finally(() => {
      isFetchingRef.current = false;
      setIsModalOpen(false);
    });
  }, [getEmployees, filterQuery]);

  return (
    <div>
      <div
        ref={listContainerRef}
        className="max-h-[600px] overflow-y-scroll rounded-lg"
        onScroll={handleScroll}
      >
        <List
          loading={isInitialLoading}
          itemLayout="horizontal"
          dataSource={employeeList}
          renderItem={(item) => (
            <List.Item
              className={`hover:bg-gray-100 ${
                selectedEmployeeId === item._id ||
                (payload && payload.service_id === item._id)
                  ? "bg-gray-100 "
                  : ""
              }`}
              key={item._id}
              onClick={(e) => {
                if (!userIsADOperator) {
                  setSelectedEmployeeId(item._id);
                  setIsModalOpen(true);
                }
              }}
            >
              <List.Item.Meta
                className="pl-4 cursor-pointer "
                title={
                  <div className="flex gap-4 justify-between ">
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {
                          employeeRolesOptions.find(
                            (role) => role.value === item.roles
                          )?.label
                        }
                      </p>
                    </div>
                    {item.archived && (
                      <Tag color="grey" className="h-6 m-auto mr-10">
                        Archivado
                      </Tag>
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
        {isLoadingMore && (
          <div className="flex justify-center py-4">
            <Spin />
          </div>
        )}
      </div>
      {!isSelect && !userIsADOperator && (
        <div className="flex justify-center mt-10 ">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => {
            setIsModalOpen(true);
          }}>
            Agregar
          </Button>
        </div>
      )}
      <NewEmployeeModal
        onFinish={handleEmployeeModalFinish}
        employeeId={selectedEmployeeId}
        isModalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        form={form}
      />
    </div>
  );
}
export default EmployeesList;
