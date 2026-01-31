import { ApolloResponse } from "@/types/utils/apollo";
import { DiveInterface } from "@/types/global/dive";
import { DivingThemeInterface } from "@/types/global/divingTheme";
import { GasTank } from "@/types/global/gas";

/**
 * Dives Collection Loader util
 * @param {ApolloResponse} collection ApolloResponse
 * @param {string} context string
 * @param {string} subProp string
 * @return {Partial<DiveInterface>[] | GasTank[] | Record<string, number>}
 */
export function useDivesCollectionLoader(
  collection: ApolloResponse,
  context?: string,
  subProp?: string
):
  | Partial<DiveInterface>[]
  | DiveInterface[]
  | GasTank[]
  | Record<string, number> {
  const key = "dives";
  const tokens: string[] = [];
  const itemsDives: Partial<DiveInterface>[] = [];
  const itemsGasTanks: GasTank[] = [];
  const themesTokensItems: Record<string, number> = {};

  collection[key as keyof typeof collection].edges
    .map((item: { node: unknown }) => item.node)
    .forEach((dive: Partial<DiveInterface>) => {
      if (
        context &&
        context === "gasTanks" &&
        (dive as Pick<DiveInterface, "gasTanks">)
      ) {
        const gasTanks = dive.gasTanks;

        gasTanks?.forEach((tank: GasTank) => {
          itemsGasTanks.push(tank);
        });
      } else if (
        context &&
        context === "themesTokens" &&
        dive[subProp as keyof typeof dive]
      ) {
        if (subProp === "divingEnvironment" || subProp === "divingRole") {
          const theme = dive[
            subProp as keyof typeof dive
          ] as DivingThemeInterface;

          tokens.push(theme.token);
        } else {
          dive.divingType?.edges
            ?.map((item: { node: DivingThemeInterface }) => item.node)
            .forEach((theme) => {
              tokens.push(theme?.token);
            });
        }
      } else {
        itemsDives.push(dive);
      }
    });

  if (context && context === "themesTokens") {
    tokens.forEach((token: string) => {
      const propName = token.replaceAll("%", "");
      themesTokensItems[propName as keyof typeof themesTokensItems]
        ? themesTokensItems[propName as keyof typeof themesTokensItems]++
        : (themesTokensItems[propName as keyof typeof themesTokensItems] = 1);
    });
  }

  return context && context === "themesTokens"
    ? themesTokensItems
    : context && context === "gasTanks"
    ? itemsGasTanks
    : itemsDives;
}
