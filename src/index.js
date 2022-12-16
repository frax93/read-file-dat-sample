import { FootballDomain } from "./domain/football";
import { WeatherDomain } from "./domain/weather";

const weatherDomain = new WeatherDomain();

weatherDomain.getMaxExcursionItem().then((item) => {
  console.log(item);
});


const footballDomain = new FootballDomain();

footballDomain.getBestDifferenceScoreTeam().then((item) => {
  console.log(item);
});
