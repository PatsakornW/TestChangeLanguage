import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import en from "../locales/en.json";
import th from "../locales/th.json";

// ค่า default ในกรณีที่ fetch API มาไม่ได้หรือไม่มีข้อมูล
const defaultTranslations: any = {
  en,
  th,
};

export const i18n = new I18n();

i18n.locale = getLocales()[0].languageCode ?? "en";

i18n.enableFallback = true;

export const setTranslationsFromApi = async (lang: string) => {
  try {
    const response = await fetch(`http://localhost:3000/test/${lang}`);
    if (response.status === 200) {
      const data = await response.json();
      i18n.translations[lang] = data;
    } else {
      i18n.translations[lang] = defaultTranslations[lang];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    i18n.translations[lang] = defaultTranslations[lang];
  }

  i18n.locale = lang; 
};
