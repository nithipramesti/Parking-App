import Axios from "axios";
import { useEffect, useState } from "react";
import "../assets/styles/Status.css";

function Profit() {
  const [paymentHistory, setPaymentHistory] = useState([]);

  const fetchPaymentHistory = () => {
    Axios.get("http://localhost:2000/history")
      .then((res) => {
        setPaymentHistory(res.data);
      })
      .catch((err) => console.log(err));
  };

  const renderTable = () => {
    return paymentHistory.map((val) => {
      return (
        <tr className={val.id % 2 ? "odd-row" : ""}>
          <td>P0{val.id}</td>
          <td>{val.filled ? "Filled" : "Empty"}</td>
          <td>{val.dateFilled ? val.dateFilled : "-"}</td>
          <td>{val.timeFilled ? val.timeFilled : "-"}</td>
        </tr>
      );
    });
  };

  const totalProfit = () => {
    let total = 0;
    paymentHistory.forEach((val) => {
      total += val.fee;
    });

    return total;
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  return (
    <div className="profit">
      <h1>Profit</h1>
      <p>
        Your current profit is Rp <span>{totalProfit()}</span>
      </p>
    </div>
  );
}

export default Profit;
