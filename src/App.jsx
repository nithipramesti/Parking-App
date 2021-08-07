import { useState } from "react";
import "./App.css";
import MainSidebar from "./component/MainSidebar";
import MainMenu from "./component/MainMenu";

function App() {
  const [mainMenu, setMainMenu] = useState([
    {
      menu: "Car In",
      subMenu: "Find available space and generate ticket",
      icon: "car",
    },
    {
      menu: "Car Out",
      subMenu: "Check-out car & payment",
      icon: "car",
    },
    {
      menu: "Status",
      subMenu: "Check available parking space",
      icon: "car",
    },
    {
      menu: "Profit",
      subMenu: "Check current profit",
      icon: "car",
    },
    {
      menu: "App",
      subMenu: "Exit app",
      icon: "car",
    },
  ]);

  const renderMainMenu = () => {
    return mainMenu.map((val) => {
      return <MainMenu title={val.menu} subTitle={val.subMenu} />;
    });
  };
  return (
    <div className="main-container">
      <MainSidebar />
      <div className="display-right">{renderMainMenu()}</div>
    </div>
  );
}

export default App;
