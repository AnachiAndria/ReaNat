import {
  Image,
  StyleSheet,
  Platform,
  Animated,
  StatusBar,
  View,
} from "react-native";
import { useRef } from "react";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const HEADER_HEIGHT = 178; // Adjust this based on your header image height
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 30; // Get status bar height

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const statusBarBackground = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: ["transparent", "white"], // Start transparent, change to white after scrolling
    extrapolate: "clamp",
  });

  return (
    <>
      {/* Dynamically change status bar background */}
      <Animated.View
        style={[
          styles.statusBarPlaceholder,
          { backgroundColor: statusBarBackground },
        ]}
      />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#DDDDDD", dark: "#1D3D47" }}
          headerImage={
            <Image
              source={require("@/assets/images/img/Dashboard.png")}
              style={styles.reactLogo}
            />
          }
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Welcome back User!</ThemedText>
            <HelloWave />
          </ThemedView>
          {/* text */}
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Step 1: Try it</ThemedText>
            <ThemedText>
              Edit{" "}
              <ThemedText type="defaultSemiBold">
                app/(tabs)/index.tsx
              </ThemedText>{" "}
              to see changes. Press{" "}
              <ThemedText type="defaultSemiBold">
                {Platform.select({
                  ios: "cmd + d",
                  android: "cmd + m",
                  web: "F12",
                })}
              </ThemedText>{" "}
              to open developer tools.
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
            <ThemedText>
              Tap the Explore tab to learn more about what's included in this
              starter app.
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
            <ThemedText>
              When you're ready, run{" "}
              <ThemedText type="defaultSemiBold">
                npm run reset-project
              </ThemedText>{" "}
              to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
              directory. This will move the current{" "}
              <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
              <ThemedText type="defaultSemiBold">app-example</ThemedText>.
            </ThemedText>
          </ThemedView>
        </ParallaxScrollView>
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  statusBarPlaceholder: {
    height: STATUS_BAR_HEIGHT,
    position: "absolute",
    width: "100%",
    zIndex: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 10, // Space below status bar
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
