import { useState } from "react";
import MainMenuComponent from "../component/MainMenuComponent";
import "../assets/styles/MainMenu.css";

function MainMenu() {
  const [mainMenu] = useState([
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
      return <MainMenuComponent title={val.menu} subTitle={val.subMenu} />;
    });
  };

  return (
    <div className="main-menu">
      <p className="logo">Parking App</p>
      <div className="menus">{renderMainMenu()}</div>
    </div>
  );
}

export default MainMenu;
