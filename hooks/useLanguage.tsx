import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { i18n, setTranslationsFromApi } from "@/libs/i18n";
import { getLocales } from "expo-localization";
import { ActivityIndicator, View } from "react-native";

interface LanguageContextProps {
  locale: string;
  changeLanguage: (lang: string) => void;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<string>(i18n.locale);
  const [loading, setLoading] = useState<boolean>(true);

  const changeLanguage = async (lang: string) => {
    setLoading(true);
    try {
      await setTranslationsFromApi(lang);
      setLocale(lang);
    } catch (error) {
      console.error("Error setting translations:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const initializeLocale = async () => {
      const deviceLocale = getLocales()[0]?.languageCode ?? "en";
      await changeLanguage(deviceLocale);
    };
    initializeLocale();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
