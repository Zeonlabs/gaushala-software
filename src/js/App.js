import React from "react";
import { BrowserRouter, Route, HashRouter } from "react-router-dom";
import routes from "./Routes";
import Home from "../Components/Dashboard/Home";
import Expences from "../Components/Expences/Expences";
import Cheques from "../Components/Cheques/Cheques";
import Animal from "../Components/Animal/Animal";
import Employees from "../Components/Employees/Employees";
import Notes from "../Components/Notes/Notes";
import TrustMembers from "../Components/TrustMembers/TrustMembers";
import Income from "../Components/CharityIncome/Income";
import SettingPage from "../Components/SettingPage/SettingPage";
import Login from "../Components/Login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <HashRouter>
        <Route exact path={routes.login} component={Login} />
        <Route path={routes.dashboard} component={Home} />
        <Route path={routes.charity} component={Income} />
        <Route path={routes.expences} component={Expences} />
        <Route path={routes.cheques} component={Cheques} />
        <Route path={routes.animal} component={Animal} />
        <Route path={routes.employees} component={Employees} />
        <Route path={routes.notes} component={Notes} />
        <Route path={routes.trustmembers} component={TrustMembers} />
        <Route path={routes.settingpage} component={SettingPage} />
      </HashRouter>
    </BrowserRouter>
  );
}

export default App;
