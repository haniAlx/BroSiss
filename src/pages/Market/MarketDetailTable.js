import { Pagination } from "antd";
import React, { useEffect, useState } from "react";

const MarketDetailTable = ({ target, marketStatus }) => {
  const [page, setPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(5);
  const lastIndexOfPage = page * postPerPage;
  const firstIndexPage = lastIndexOfPage - postPerPage;
  const currentPage = target.slice(firstIndexPage, lastIndexOfPage);
  const totalPages = target.length;
  const onShowSizeChange = (current, pageSize) => {
    setpostPerPage(pageSize);
    console.log(pageSize);
  };

  useEffect(() => {
    setPage(1);
  }, [target]);
  return (
    <div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Cargo Id</th>
              <th>Vehicle Owner Name</th>
              <th>Driver Name</th>
              <th>Plate Number</th>
              <th>Vehicle Capacity</th>
              <th>State</th>
              {marketStatus === "FINISHED" ? <th>Payment</th> : ""}
            </tr>
          </thead>

          <tbody>
            {target.length > 0 ? (
              currentPage.map((item, index) => (
                <tr className="" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.vehicleOwner}</td>
                  <td>{item.driver}</td>
                  <td>{item.plateNumber || "NULL"}</td>

                  <td>{item.vehicleCapacity || "NULL"}</td>
                  <td>{item.driverState || "NULL"}</td>
                  {marketStatus === "FINISHED" ? (
                    <td>
                      <button
                        className="btn btn-bg-blue"
                        style={{ height: "30px" }}
                      >
                        Pay
                      </button>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td>NoRecored Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        onChange={(page) => setPage(page)}
        pageSize={postPerPage}
        current={page}
        total={totalPages}
        showQuickJumper
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  );
};

export default MarketDetailTable;
