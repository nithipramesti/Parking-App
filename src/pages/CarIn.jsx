import { useState } from "react";
import "../assets/styles/CarIn.css";

function CarIn() {
  const [parkingSpace, setParkingSpace] = useState([
    { no: 1, fill: true, hour: 4 },
    { no: 2, fill: true, hour: 3 },
    { no: 3, fill: true, hour: 1 },
    { no: 4, fill: false, hour: 0 },
    { no: 5, fill: true, hour: 3 },
    { no: 6, fill: false, hour: 0 },
    { no: 7, fill: false, hour: 0 },
    { no: 8, fill: true, hour: 7 },
  ]);
  const [ticketDisplay, setTicketDisplay] = useState(false);

  const renderParkingSpace = () => {
    return parkingSpace.map((val) => {
      return (
        <div className={`parkingUnit fill-${val.fill}`}>
          <p>{val.no}</p>
        </div>
      );
    });
  };

  const findNearestSpace = () => {
    return parkingSpace.findIndex((val) => val.fill === false);
  };

  const generateTicket = () => {
    const timeCome = document.querySelector("#time-come");
    const dateCome = document.querySelector("#date-come");
    const parkingNo = document.querySelector("#parking-no span");

    // Time come
    const hourNow = new Date().getHours();
    const minuteNow = new Date().getMinutes();
    const secondNow = new Date().getSeconds();
    timeCome.innerHTML = `${hourNow}:${minuteNow}:${secondNow}`;

    //Date come
    const dateNow = new Date().getDate();
    const monthNow = new Date().getMonth();
    const yearNow = new Date().getFullYear();
    dateCome.innerHTML = `${dateNow}/${monthNow + 1}/${yearNow}`;

    //Parking slot no
    parkingNo.innerHTML = findNearestSpace() + 1;

    //Displaying ticket
    setTicketDisplay(true);
  };

  return (
    <div className="carIn">
      <div className="parkingSpace">{renderParkingSpace()}</div>
      <button className="btn-ticket" onClick={generateTicket}>
        Generate Ticket
      </button>
      <div className={`ticket display-${ticketDisplay}`}>
        <header>
          <p>------------------------------</p>
          <p className="ticket-title">PARKING TICKET</p>
          <p>------------------------------</p>
        </header>
        <p id="time-come">12:25:00</p>
        <p id="date-come">24//07/2021</p>
        <p id="parking-no">
          Parking no: P<span>6</span>
        </p>
        <button onClick={() => setTicketDisplay(false)}>Close</button>
      </div>
    </div>
  );
}

export default CarIn;
