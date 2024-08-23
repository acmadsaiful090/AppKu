import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox } from "react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContainer from "navigation/AppContainer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AssetsIconsPack from "assets/AssetsIconsPack";
import lightTheme from "constants/theme/light.json";
import darkTheme from "constants/theme/dark.json";
import customTheme from "constants/theme/appTheme.json";
import customMapping from "constants/theme/mapping.json";
import { useCachedResources } from "./src/hooks";

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    AsyncStorage.getItem("theme").then(value => {
      if (value === "light" || value === "dark") {
        setTheme(value);
      }
    });
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    AsyncStorage.setItem("theme", nextTheme).then(() => {
      setTheme(nextTheme);
    });
  };

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  const currentTheme = theme === "light" ? lightTheme : darkTheme;
  const statusBarColor = theme === "light" ? "#E4E9F2" : "#1A2138";
  const statusBarStyle = theme === "light" ? "dark-content" : "light-content";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <IconRegistry icons={[EvaIconsPack, AssetsIconsPack]} />
        <ApplicationProvider
          {...eva}
          theme={{ ...eva[theme], ...customTheme, ...currentTheme }}
          customMapping={customMapping}
        >
          <StatusBar
            backgroundColor={statusBarColor}
            barStyle={statusBarStyle}
          />
          <AppContainer toggleTheme={toggleTheme} currentTheme={theme} />
        </ApplicationProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
