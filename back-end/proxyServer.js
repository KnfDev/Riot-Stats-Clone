const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());

const API_KEY = "RGAPI-52d9d987-c50c-478d-8cea-80c5b8ad5053"; // update riot api key here
const BASE_URL = "https://na1.api.riotgames.com";
const SUMM_URL = "/lol/summoner/v4/summoners/by-name/";
const API_CALL = "https://americas.api.riotgames.com";
const MATCHES_URL = "/lol/match/v5/matches/by-puuid/"; // /lol/match/v5/matches/by-puuid/{puuid}/ids
const MATCH_DATA_URL = "/lol/match/v5/matches/";

function playerPUUID(summoner) {
  return axios
    .get(`${BASE_URL}${SUMM_URL}${summoner}?api_key=${API_KEY}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
}

app.get("/summoner", async (req, res)=> {
  const summoner = req.query.username
  const summonerData = await playerPUUID(summoner)
  res.json(summonerData)
})

app.get("/matches", async (req, res) => {
  const summoner = req.query.username
  const summonerData = await playerPUUID(summoner);
  const MATCHES_API_CALL = `${API_CALL}${MATCHES_URL}${summonerData.puuid}/ids?api_key=${API_KEY}`;
  const matchIDs = await axios
    .get(MATCHES_API_CALL)
    .then((response) => response.data)
    .catch((err) => err);

  let matchDataArray = [];
  for (let i = 0; i < matchIDs.length - 10; i++) {
    const matchID = matchIDs[i];
    const matchData = await axios
      .get(`${API_CALL}${MATCH_DATA_URL}${matchID}?api_key=${API_KEY}`)
      .then((response) => response.data)
      .catch((err) => err);
    matchDataArray.push(matchData);
  }
  res.json(matchDataArray);
});

app.listen(4000, function () {
  console.log("Server started on port 4000");
});
