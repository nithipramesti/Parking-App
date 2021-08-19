import "../assets/styles/MainMenuComponent.css";
import { Link } from "react-router-dom";

function MainMenuComponent(props) {
  return (
    <Link
      to={"/" + props.propsData.link}
      className="menu-container"
      style={{ textDecoration: "none" }}
    >
      <div className="menu-icon"></div>
      <div className="menu-text">
        <p className="menu-title">{props.propsData.menuTitle}</p>
        {/* <p className="menu-subTitle">{props.subTitle}</p> */}
      </div>
    </Link>
  );
}

export default MainMenuComponent;
