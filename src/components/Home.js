import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import "./Home.css";

const Home = () => {
  const [apiData, setApiData] = useState([]);
  const [input, setInput] = useState("");
  const [cardData, setCardData] = useState([]);
  const [message, setMessage] = useState("");

  const getdata = async () => {
    const response = await fetch("https://api.npoint.io/20c1afef1661881ddc9c");
    const data = await response.json();
    data.playerList.sort((a, b) => Number(a.Value) - Number(b.Value));
    setApiData(data);
    setCardData(data.playerList);
  };
  useEffect(() => {
    getdata();
  }, []);

  const handleSearch = () => {
    const name = apiData.playerList.filter((item) => {
      return (
        item.PFName.toLowerCase().includes(input) ||
        item.TName.toLowerCase().includes(input)
      );
    });
    setCardData(name);
    if (name.length !== 0) {
      setMessage("");
    } else {
      setMessage("No Player Found");
    }

    setInput("");
  };

  return (
    <div className="conatiner">
      <div className="search">
        <input
          className="search_input"
          value={input}
          onChange={(e) => setInput(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search.."
          name="search"
        />
        <button className="search_button" type="submit" onClick={handleSearch}>
          <i className="fa fa-search"></i>
        </button>
      </div>

      <div className="player_cards">
        {cardData?.map((item) => {
          return <Cards key={item.Id} item={item} />;
        })}
        <h3>{message}</h3>
      </div>
    </div>
  );
};

export default Home;
