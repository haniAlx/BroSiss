import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import SideBar from "./components/SideBar";
import Homepage from "./pages/homepage";
import SignIn from "./components/SignInPages/Signin";
import ForgatePass from "./components/SignInPages/ForgatePass";
import ConfirmPass from "./components/SignInPages/ConfirmPass";
import ErrorPage from "./pages/ErrorPage";
import Vehicle from "./pages/Vehicle/Vehicle";
import Drivers from "./pages/Driver/Drivers";
import DataLoadContext, {
  useLoadContext,
} from "./components/context/DataLoadContext";
import { useUserContext } from "./components/context/UserContext";
import VehicleDetail from "./pages/Vehicle/VehicleDetail";
import DriverDetail from "./pages/Driver/DriverDetail";
import Users from "./pages/User/Users";
import UserDetail from "./pages/User/UserDetail";
import AddVehicle from "./pages/User/AddVehicle";
import AddDriver from "./pages/User/AddDriver";
import ChangeDriver from "./pages/Vehicle/ChangeDriver";
import Market from "./pages/Market/Market";
import MarketDetail from "./pages/Market/MarketDetail";
import CompanyOwnerRegistration from "./Registration/CompanyOwnerRegistration";
import IndividualRegistration from "./Registration/IndividualRegistration";
import CargoOwnerRegistration from "./Registration/CargoOwnerRegistration";
import CargoDetail from "./pages/User/CargoDetail";
import SettingsUpdate from "./components/Settings/SettingsUpdate";
import Alerts from "./components/Alerts/Alerts";
import AlertsHistory from "./components/Alerts/AlertHistory";
import Report from "./pages/Report/Report";
import AddCargoPost from "./pages/User/AddCargoPost";
import ActiveMarkets from "./pages/Market/ActiveMarkets";
import NewMarkets from "./pages/Market/NewMarkets";
function App() {
  const jwt = localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt"))
    : "";
  const [expire, setExpier] = useState();
  useEffect(() => {
    const expire = localStorage.getItem("expire") ? true : false;
    setExpier(expire);
  }, []);

  // console.log(expire);
  return (
    <>
      <BrowserRouter>
        <DataLoadContext>
          {!expire && jwt ? (
            <>
              <div>
                <Navigation />

                <div className="main-container">
                  <div className="container_mv">
                    <SideBar />
                    <Routes>
                      <Route exact path="/" element={<Homepage />}></Route>
                      <Route path="/dashboard" element={<Homepage />}></Route>
                      <Route path="/vehicle" element={<Vehicle />} />
                      <Route path="/driver" element={<Drivers />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/report" element={<Report />} />
                      <Route
                        path="/companyOwnerRegister"
                        element={<CompanyOwnerRegistration />}
                      />
                      <Route
                        path="/IndividualRegister"
                        element={<IndividualRegistration />}
                      />
                      <Route
                        path="/cargoOwnerRegister"
                        element={<CargoOwnerRegistration />}
                      />
                      <Route
                        path="/cargoOwnerDetail/:id"
                        element={<CargoDetail />}
                      />
                      <Route 
                       path='Cargo/PostCargo/:ownerPhone'
                        element={<AddCargoPost/>}
                        />
                      <Route path="/users/:role/:id" element={<UserDetail />} />
                      <Route path="/settings" element={<SettingsUpdate />} />
                      
                      <Route
                        path="/users/addDriver/:ownerPhone"
                        element={<AddDriver />}
                      />
                      <Route
                        path="/users/addVehicle/:ownerPhone"
                        element={<AddVehicle />}
                      />
                      <Route
                        path="/vehicle/detail/:vehicleId"
                        element={<VehicleDetail />}
                      />
                      <Route
                        path="/driver/detail/:driverId"
                        element={<DriverDetail />}
                      />
                      <Route
                        path="/vehicle/changeAssign/:ownerId/:plateNumber"
                        element={<ChangeDriver />}
                      />
                      <Route
                        path="/vehicle/AssignDriver/:ownerId/:plateNumber/:state"
                        element={<ChangeDriver />}
                      />
                      <Route path="/market" element={<Market />} />
                      <Route
                        path="/market/marketDetailNew/:id"
                        element={<NewMarkets />}
                      />
                      <Route path="/market/marketDetailActive/:id"
                      element={<ActiveMarkets/>}/>
                      
                      <Route path="/alerts" element={<Alerts />} />
                      <Route path="/alerthistory" element={<AlertsHistory />} />
                      <Route
                        path="/ForgatePass"
                        element={<ForgatePass />}
                      ></Route>
                      <Route
                        path="/ConfirmPass"
                        element={<ConfirmPass />}
                      ></Route>
                      <Route path="*" element={<SignIn />} />
                      <Route path="*" element={<ErrorPage />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Routes>
              <Route path="/" element={<SignIn />}></Route>
              <Route path="/ForgatePass" element={<ForgatePass />}></Route>
              <Route path="/ConfirmPass" element={<ConfirmPass />}></Route>
              <Route path="*" element={<SignIn />} />
            </Routes>
          )}
        </DataLoadContext>
      </BrowserRouter>
    </>
  );
}

export default App;
