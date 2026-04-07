import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

export const useNationalities = () => {
  return Object.entries(countries.getNames("en", { select: "official" }))
    .map(([code, label]) => ({ code, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
};
