import { letterView } from "../../../letterView";
import { WordStat } from "./word.stat";

export interface GameResults {
  letterConteiner: letterView[];
  timeOfGame: number;
  language: 'en' | 'uk';
  mode: string;
  length: number;
}