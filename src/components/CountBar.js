import { useEffect, useState } from "react";
import classes from "./CountBar.module.css";

function CountBar(props) {
  const [time, setTime] = useState(100);

  async function SetTimer(delay) {
    let timeleft = delay;
    let seconds = ~~timeleft % 60;
    var downloadTimer = setInterval(async function () {
      seconds = (~~timeleft % 60) + "0";
      if (timeleft < 0) {
        clearInterval(downloadTimer);
        alert("FINITOOOO");
      } else {
        // setTime(seconds);
      }
      timeleft -= 1;
    }, 1000);
  }

  useEffect(() => {
    setTime(0);
    SetTimer(9);
  }, []);

  
  return (
    <div className={classes["count-bar"]}>
      <div className={classes["count-bar__inner"]}>
        <div
          className={classes["count-bar__fill"]}
          style={{ width: `${time}%` }}
        ></div>
      </div>
    </div>
  );
}

export default CountBar;
