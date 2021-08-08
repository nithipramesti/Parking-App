import "../assets/styles/MainMenuComponent.css";

function MainMenuComponent(props) {
  return (
    <div className="menu-container">
      <div className="menu-icon"></div>
      <div className="menu-text">
        <p className="menu-title">{props.title}</p>
        <p className="menu-subTitle">{props.subTitle}</p>
      </div>
    </div>
  );
}

export default MainMenuComponent;
