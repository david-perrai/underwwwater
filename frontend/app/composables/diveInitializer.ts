import { DiveInterface } from "@/types/global/dive";

/**
 * Initialize dive object with default values
 * @return {DiveInterface}
 */
export function useDiveInitializer(): DiveInterface {
  return {
    id: null,
    date: new Date(),
    totalTime: 0,
    maxDepth: 0,
    gasTanks: [
      {
        gasMix: {
          helium: 0,
          oxygen: 21,
          nitrogen: 79,
        },
        pressureStart: 200,
        pressureEnd: 50,
      },
    ],
    divingType: { edges: [] },
    divingEnvironment: null,
    divingRole: null,
  };
}
