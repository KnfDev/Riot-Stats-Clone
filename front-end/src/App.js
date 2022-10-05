import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [player, setPlayer] = useState("");
  const [summonerData, setSummonerData] = useState({});
  const [matchList, setMatchList] = useState([]);
  const [champions, setChampions] = useState({})
  useEffect(loadChampions, [])
  function loadChampions(){
    axios
    .get(
      "http://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion.json"
    )
    .then((response) => setChampions(response.data.data))
    .catch(function (error) {
      console.log(error);
    });
  }

  if(champions === {}){
    return "loading..."
  }
  function getChampionById(id){
    for(const champion in champions){
      if(champions[champion].key==id){
        return champions[champion].name
      }
    }
  }

  console.log('gittest')

  function getMatches(event) {
    event.preventDefault();
    axios
      .get("http://localhost:4000/matches", { params: { username: player } })
      .then((response) => setMatchList(response.data))
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/summoner", { params: { username: player } })
      .then((response) => setSummonerData(response.data))
      .catch(function (error) {
        console.log(error);
      });
  }

  if (matchList === []) {
    return "loading..";
  }

  
  const matchInfo = matchList.map((matchData, index) => {
    const team1data = matchData.info.teams.slice(0, 1).map((data) => {
      return data;
    });

    //NEED TO IMPLEMENT BANS SOMEHOW

    const team2data = matchData.info.teams.slice(-1).map((data) => {
      return data;
    });

    const team1result = team1data.map((data) =>
      data.win === true ? "true" : "false"
    );
    const team2result = team2data.map((data) =>
      data.win === true ? "true" : "false"
    );

    const team1kills = team1data.map((data) => data.objectives.champion.kills);
    const team2kills = team2data.map((data) => data.objectives.champion.kills);
  
    return (
      <div key={index}>
        <p>
          Blue Team :{" "}
          {team1result.includes("true") ? (
            <span className="victory">Victory</span>
          ) : (
            <span className="defeat">Defeat</span>
          )}
        </p>
        <p>Total Kills: {team1kills}</p>
        {matchData.info.gameMode === "ARAM" ? 
        null : 
        <div>
        <p>Bans:</p>
        {/* <img src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${team1BannedChamps[0]}.png`} alt=""/>
        <img src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${team1BannedChamps[1]}.png`} alt=""/>
        <img src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${team1BannedChamps[2]}.png`} alt=""/>
        <img src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${team1BannedChamps[3]}.png`} alt=""/>
        <img src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${team1BannedChamps[4]}.png`} alt=""/> */}
        </div>}   
        {matchData.info.participants
          .slice(0, 5)
          .map((data, participantIndex) => {
            return (
              <div key={participantIndex} className="playerBox">
                <img
                  className="champIcon"
                  src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${data.championName}.png`}
                  alt=""
                />
                <span className="sumName">{data.summonerName}</span>
                <span>
                  {data.kills}/<span className="deaths">{data.deaths}</span>/
                  {data.assists}
                </span>
                <span className="itemBox">
                  <img
                    className="itemImg"
                    src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${data.item0}.png`}
                    alt=""
                  />
                  <img
                    className="itemImg"
                    src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${data.item1}.png`}
                    alt=""
                  />
                  <img
                    className="itemImg"
                    src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${data.item2}.png`}
                    alt=""
                  />
                  <img
                    className="itemImg"
                    src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${data.item3}.png`}
                    alt=""
                  />
                  <img
                    className="itemImg"
                    src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${data.item4}.png`}
                    alt=""
                  />
                  <img
                    className="itemImg"
                    src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${data.item5}.png`}
                    alt=""
                  />
                </span>
              </div>
            );
          })}
        <hr />
        <p>
          Red Team :{" "}
          {team2result.includes("true") ? (
            <span className="victory">Victory</span>
          ) : (
            <span className="defeat">Defeat</span>
          )}
        </p>
        <p>Total Kills: {team2kills}</p>
        {matchData.info.participants.slice(-5).map((data, participantIndex) => {
          return (
            <div key={participantIndex} className="playerBox">
              <img
                className="champIcon"
                src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${data.championName}.png`}
                alt=""
              />
              <span className="sumName">{data.summonerName}</span>
              <span>
                {data.kills}/<span className="deaths">{data.deaths}</span>/
                {data.assists}
              </span>
              <span className="itemBox">
                <img
                  className="itemImg"
                  src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${data.item0}.png`}
                  alt=""
                />
                <img
                  className="itemImg"
                  src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${data.item1}.png`}
                  alt=""
                />
                <img
                  className="itemImg"
                  src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${data.item2}.png`}
                  alt=""
                />
                <img
                  className="itemImg"
                  src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${data.item3}.png`}
                  alt=""
                />
                <img
                  className="itemImg"
                  src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${data.item4}.png`}
                  alt=""
                />
                <img
                  className="itemImg"
                  src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${data.item5}.png`}
                  alt=""
                />
              </span>
            </div>
          );
        })}
        <hr />
      </div>
    );
  });

  return (
    <div className="App">
      <h1>League of Inters</h1>
      <div className="searchDiv">
        <input
          type="text"
          placeholder="Enter Summoner Name"
          onChange={(e) => setPlayer(e.target.value)}
        />
        <button type="submit" onClick={getMatches}>
          Search
        </button>
      </div>
      {summonerData && (
        <div className="profileBox">
          <img
            className="profileIcon"
            src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/profileicon/${summonerData.profileIconId}.png`}
            alt={summonerData === {} ? "" : `profileIcon`}
          />
          {summonerData.name}
        </div>
      )}
      <div className="matchBox">{matchInfo}</div>
    </div>
  );
}

export default App;
