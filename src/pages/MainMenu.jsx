import { useState } from "react";
import MainMenuComponent from "../component/MainMenuComponent";
import "../assets/styles/MainMenu.css";

function MainMenu() {
  const [mainMenu] = useState([
    {
      menuTitle: "Car In",
      link: "car-in",
      subMenuTitle: "Find available space and generate ticket",
      icon: "car",
    },
    {
      menuTitle: "Car Out",
      link: "car-out",
      subMenu: "Check-out car & payment",
      icon: "car",
    },
    {
      menuTitle: "Status",
      link: "status",
      subMenu: "Check available parking space",
      icon: "car",
    },
    {
      menuTitle: "Profit",
      link: "profit",
      subMenu: "Check current profit",
      icon: "car",
    },
    {
      menuTitle: "Exit",
      link: "exit",
      subMenu: "Exit app",
      icon: "car",
    },
  ]);

  const renderMainMenu = () => {
    return mainMenu.map((val) => {
      return <MainMenuComponent propsData={val} />;
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
