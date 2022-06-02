export interface Config {
  tables: number[];
  random: boolean;
  loop: boolean;
  race: boolean;
  raceTime: number;
  sayOperation: boolean;
  sayResult: boolean;
}

export interface Operation {
  operator: "+" | "-" | "x" | "/";
  operands: number[];
}
