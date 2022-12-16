import { FileManager } from "../utility/file-manager";

const path = './data/football.dat';

export class FootballDomain {
  constructor() {
    this.fileManager = new FileManager(path);
    this.headerFootball = [];
    this.footballElements = [];
  }

  async readElements() {
    if (!this.footballElements.length > 0) {
      const fileData = await this.fileManager.readFilePromise(true);
      this.footballElements = fileData.data || [];
      this.headerFootball = fileData.header || [];
      return fileData;
    }
  }

  async getBestDifferenceScoreTeam() {
    try {
      await this.readElements();
      let bestScore, footballElementMinDiffScore;
    
      this.footballElements.forEach(footballElement => {
        const maxScoreTeam = Number.parseInt(footballElement[6], 10);
        const minScoreTeam = Number.parseInt(footballElement[8], 10);
        const differenceScore = maxScoreTeam - minScoreTeam;
    
        if (((differenceScore < bestScore) || !bestScore)  && differenceScore > 0) {
          bestScore = differenceScore;
          footballElementMinDiffScore = footballElement;
        }
      });

      return footballElementMinDiffScore;

    } catch (error) {
      console.log(error);
    }
  }
}