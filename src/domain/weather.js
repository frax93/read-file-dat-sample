import { FileManager } from "../utility/file-manager";

const path = './data/weather.dat';

export class WeatherDomain {
  constructor() {
    this.fileManager = new FileManager(path);
    this.headerWeather = [];
    this.weatherElements = [];
  }

  async readElements() {
    const fileData = await this.fileManager.readFilePromise(true);
    this.weatherElements = fileData.data || [];
    this.headerWeather = fileData.header || [];
  }

  async getMaxExcursionItem() {
    try {
      await this.readElements();
      let maxExcursion, weatherElementMaxExcursion;
    
      this.weatherElements.forEach(weatherElement => {
        const maxTemperature = Number.parseInt(weatherElement[1], 10);
        const minTemperature = Number.parseInt(weatherElement[2], 10);
        const diffTemperature = Math.abs(maxTemperature - minTemperature);
    
        if (diffTemperature > maxExcursion || !maxExcursion) {
          maxExcursion = diffTemperature;
          weatherElementMaxExcursion = weatherElement;
        }
      });

      return weatherElementMaxExcursion;

    } catch (error) {
      console.log(error);
    }
  }
}