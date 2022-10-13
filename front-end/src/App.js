import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [player, setPlayer] = useState("");
  const [summonerData, setSummonerData] = useState({});
  const [matchList, setMatchList] = useState([]);
  const [champions, setChampions] = useState({});

  useEffect(loadChampions, []);
  function loadChampions() {
    axios
      .get(
        "http://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion.json"
      )
      .then((response) => setChampions(response.data.data))
      .catch(function (error) {
        console.log(error);
      });
  }

  let championNameKeys = Object.values(champions);

  // console.log("matchinfo", matchList);

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
    // const team1data = matchData.teams.slice(0, 1).map((data) => {
    //   return data;
    // });
    // championNameKeys = array of objects of key value pairs
    // championNameKeys.key=#
    // championNameKeys.id=champion name
    const team1data = matchData.teams[0];
    console.log('team1data',team1data)
    const team2data = matchData.teams[1]

    const team1BannedChampions = team1data?.bans.map((ban) => {
      console.log("bans", ban.championId);
      const champion = championNameKeys.find(
        (champion) =>
          Number(champion.key) === Number(ban.championId) &&
          ban.championId !== Number(-1)
      );
      if (champion?.id === undefined) {
        return null;
      } else {
        return (
          <img
          className="champIcon"
          src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${champion?.id}.png`}
          alt=""
        />
        )
      }
    });
    const team2BannedChampions = team2data?.bans.map((ban) => {
      console.log("bans", ban.championId);
      const champion = championNameKeys.find(
        (champion) =>
          Number(champion.key) === Number(ban.championId) &&
          ban.championId !== Number(-1)
      );
      if (champion?.id === undefined) {
        return null;
      } else {
        return (
          <img
          className="banIcon"
          src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${champion?.id}.png`}
          alt=""
        />
        )
      }
    });




    const team1kills = team1data.objectives.champion.kills
    const team2kills = team2data.objectives.champion.kills

    return (
      <div key={index}>
        <p>
          Blue Team :{" "}
          {team1data.win === true ? (
            <span className="victory">Victory</span>
          ) : (
            <span className="defeat">Defeat</span>
          )}
        </p>
        <p>Total Kills: {team1kills}</p>
        {matchData.gameMode === "ARAM" ? null : (
          <div className="bans">
            <p>Bans:</p>
            {team1BannedChampions}
          </div>
        )}
        {matchData.participants.slice(0, 5).map((data, participantIndex) => {
          return (
            <div key={participantIndex} className="playerBox">
              <div className="champbox">
              <img
                className="champIcon"
                src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${data.championName}.png`}
                alt=""
              />
              </div>
              <div className="sumName">{data.summonerName}</div>
              <div className="kda">
                {data.kills}/<span className="deaths">{data.deaths}</span>/
                {data.assists}
              </div>
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
          {team2data.win === true ? (
            <span className="victory">Victory</span>
          ) : (
            <span className="defeat">Defeat</span>
          )}
        </p>
        <p>Total Kills: {team2kills}</p>
        {matchData.gameMode === "ARAM" ? null : (
          <div className="bans">
            <p>Bans:</p>
            {team2BannedChampions}
          </div>
        )}
        {matchData.participants.slice(-5).map((data, participantIndex) => {
          return (
            <div key={participantIndex} className="playerBox">
              <div className="champbox">
              <img
                className="champIcon"
                src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${data.championName}.png`}
                alt=""
                />
                </div>
              <div className="sumName">{data.summonerName}</div>
              <div className="kda">
                {data.kills}/<span className="deaths">{data.deaths}</span>/
                {data.assists}
              </div>
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
