import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import MainSidebar from "./component/MainSidebar";
import MainMenu from "./pages/MainMenu";
import CarIn from "./pages/CarIn";
import CarOut from "./pages/CarOut";

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <MainMenu />
        <div className="display-right">
          <Switch>
            <Route component={CarIn} path="/car-in" />
            <Route component={CarOut} path="/car-out" />
            <Route component={MainMenu} path="/" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
