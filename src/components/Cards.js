import React from "react";
import "./Cards.css";

const Cards = ({ item }) => {
  function convertUTCDateToLocalDate(date) {
    if (date) {
      let dateLocal = new Date(date);
      let newDate = new Date(
        dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000
      );
      let year = newDate.getFullYear(),
        month = newDate.getMonth() + 1,
        day = newDate.getDate(),
        hour = newDate.getHours(),
        minute = newDate.getMinutes(),
        second = newDate.getSeconds(),
        hourFormatted = hour % 12 || 12,
        minuteFormatted = minute < 10 ? "0" + minute : minute,
        morning = hour < 12 ? "am" : "pm";

      let updatedDate =
        day +
        "-" +
        month +
        "-" +
        year +
        " " +
        hourFormatted +
        ":" +
        minuteFormatted +
        morning;

      return updatedDate;
    }
    return "";
  }

  let imgsrc = "";
  try {
    imgsrc = `./player-images/${item.Id}.jpg`;
  } catch (err) {
    imgsrc = `./player-images/Default-avatar.jpg`;
  }
  return (
    <div className="cards">
      <div className="card_img">
        <img src={imgsrc} alt="No Image Available" />
      </div>
      <span>Full Name : {item.PFName}</span>
      <div className="card_desc">
        <span>Skill : {item.SkillDesc}</span>
        <span>Value : $ {item.Value}</span>
      </div>

      {item.UpComingMatchesList[0].CCode ? (
        <div className="card_upcomingbody">
          <h3>Up comming Matches</h3>
          <span>
            {item.UpComingMatchesList[0].CCode} -{" "}
            <span style={{ fontWeight: "bold" }}>VS</span> -{" "}
            {item.UpComingMatchesList[0].VsCCode}
          </span>
          <br />
          <span>
            {convertUTCDateToLocalDate(item.UpComingMatchesList[0].MDate)}
          </span>
        </div>
      ) : (
        <h4 className="card_upcomingbody"> No upcomming Match</h4>
      )}
    </div>
  );
};

export default Cards;
