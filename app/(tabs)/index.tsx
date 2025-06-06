import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
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
        <ThemedText type="title">Concentration Activities</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Pressable
          onPress={() => router.navigate("./level1")}
          style={({ pressed }) => ({
            backgroundColor: pressed ? "lightgrey" : "blue",
            padding: 20,
            marginTop: 100,
            borderRadius: 50,
            width: 150,
            alignSelf: "center",
          })}
        >
          {({ pressed }) => (
            <ThemedText
              type="defaultSemiBold"
              style={[
                { textAlign: "center", color: pressed ? "black" : "white" },
              ]}
            >
              Play
            </ThemedText>
          )}
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
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
