import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import MainMenu from "./pages/MainMenu";
import CarIn from "./pages/CarIn";
import CarOut from "./pages/CarOut";
import Status from "./pages/Status";
import Profit from "./pages/Profit";

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <MainMenu />
        <div className="display-right">
          <Switch>
            <Route component={CarIn} path="/car-in" />
            <Route component={CarOut} path="/car-out" />
            <Route component={Status} path="/status" />
            <Route component={Profit} path="/profit" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
