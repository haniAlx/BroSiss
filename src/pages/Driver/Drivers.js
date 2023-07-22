import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import TopCards from "../../components/cards/TopCards";
import { MdError, MdPeople, MdVerified } from "react-icons/md";
import { FaRoute } from "react-icons/fa";
import { useLoadContext } from "../../components/context/DataLoadContext";
import DriversTable from "./DriversTable";
import "./driver.css";
import ManageDriver from "./ManageDriver";
function Drivers() {
  const [allDrivers, setAllDrivers] = useState([]);
  const [onRoute, setOnRoute] = useState([]);
  const [Assigned, setAssigned] = useState([]);
  const [unassigned, setUnassigned] = useState([]);
  const [permit, setPermit] = useState([]);
  const [error, setError] = useState();
  const [tableData, setTableData] = useState(allDrivers);
  const { payload, loading } = useLoadContext();

  useEffect(() => {
    const getAllApiData = async () => {
      setAllDrivers(payload.allDrivers);
      setAssigned(payload.assigned);
      setOnRoute(payload.onRoute);
      setUnassigned(payload.unassigned);
      setPermit(payload.permit);
      setTableData(payload.allDrivers);
    };
    getAllApiData();

    return () => {};
  }, []);

  const topCardDetail = [
    {
      title: "Total Driver",
      data: allDrivers.length || null,
      icon: MdPeople,
      color: "rgb(94, 175, 255)",
      name: "totalDrivers",
    },
    {
      title: "OnRoute",
      data: onRoute.length || null,
      icon: FaRoute,
      color: "rgb(255, 234, 94)",
      name: "onRoute",
    },
    {
      title: "Assigned",
      data: Assigned.length || null,
      icon: MdVerified,
      color: "rgb(102, 255, 94)",
      name: "assigned",
    },
    {
      title: "Unassigned",
      data: unassigned.length || null,
      icon: MdError,
      color: "rgb(255, 94, 116)",
      name: "unassigned",
    },
    {
      title: "Permit",
      data: permit.length || 0,
      icon: MdError,
      color: "rgb(223, 94, 255)",
      name: "permit",
    },
  ];
  const [activeCard, setActiveCard] = useState("totalDrivers");
  /** Handling Card Change */
  const handleCardChange = (name) => {
    setActiveCard(name);
    switch (name) {
      case "totalDrivers":
        setTableData(allDrivers);
        break;
      case "onRoute":
        setTableData(onRoute);
        break;
      case "assigned":
        setTableData(Assigned);
        break;
      case "unassigned":
        setTableData(unassigned);
        break;
      case "permit":
        setTableData(permit);
        break;
      default:
        setTableData(allDrivers);
    }
  };
  const [showManage, setShowManage] = useState(false);
  const [driverDetail, setDriverDetail] = useState();
  const handleManage = (item) => {
    setShowManage(true);
    setDriverDetail(item);
    console.log(item);
  };
  return (
    <div className="main-bar">
      {showManage && (
        <ManageDriver
          setShowManage={setShowManage}
          driverDetail={driverDetail}
        />
      )}
      <h2 style={{}}>Driver</h2>
      <hr className="hr" />
      <div className="main-bar-driver">
        {error ? (
          <p
            style={{
              textAlign: "center",
              fontSize: "25px",
              marginTop: "50px",
              color: "red",
            }}
          >
            {error}
          </p>
        ) : (
          ""
        )}
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              flexDirection: "column",
              rowGap: "50px",
            }}
          >
            <ReactLoading type="bars" width={100} height={50} color="black" />
            <p>Loading Data Please Wait</p>
          </div>
        ) : (
          !error && (
            <>
              <div className="top-card-holder">
                {topCardDetail.map((item, index) => (
                  <TopCards
                    title={item.title}
                    icon={item.icon}
                    data={item.data}
                    color={item.color}
                    key={index}
                    handleCardChange={() => handleCardChange(item.name)}
                    active={activeCard}
                    name={item.name}
                  />
                ))}
              </div>
              <div className="table-container">
                <DriversTable
                  target={tableData}
                  handleManage={(val) => handleManage(val)}
                />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default Drivers;
