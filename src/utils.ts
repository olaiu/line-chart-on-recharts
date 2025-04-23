import { type Page } from "./types";

export const mean = (arr: Page[], propName: string) =>
  arr.reduce((acc, d) => acc + d[propName], 0) / arr.length;

export const standardDeviation = (
  arr: Page[],
  propName: string,
  mean: number
) => {
  const variance =
    arr.reduce((sum, value) => sum + Math.pow(value[propName] - mean, 2), 0) /
    arr.length;
  return Math.sqrt(variance);
};
