import { Image, StyleSheet, Button, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { i18n } from "@/libs/i18n";
import { getLocales } from "expo-localization";
import { useLanguage } from "@/hooks/useLanguage";

export default function HomeScreen() {
  const { changeLanguage } = useLanguage();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{i18n.t("Home.welcome")}</ThemedText>
        <HelloWave />
        <Button onPress={() => changeLanguage("th")} title={"เปลี่ยนภาษาไทย"} />
        <Button
          onPress={() => changeLanguage("en")}
          title={"เปลี่ยนภาษาอังกฤษ"}
        />
        <Text>Current locale: {i18n.locale}</Text>
        <Text>Device locale: {getLocales()[0].languageCode}</Text>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
