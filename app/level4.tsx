import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import shuffleArray from "@/utils/shuffleArray";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

const kids = [
  { id: 1, str: "First", image: require("../assets/images/kids/kid1.png") },
  { id: 2, str: "Second", image: require("../assets/images/kids/kid2.png") },
  { id: 3, str: "Third", image: require("../assets/images/kids/kid3.png") },
  { id: 4, str: "Fourth", image: require("../assets/images/kids/kid4.png") },
  { id: 5, str: "Fifth", image: require("../assets/images/kids/kid5.png") },
];

const screenWidth = Dimensions.get("window").width;
const imageSize = (screenWidth - 20) / 2;

interface Kid {
  id: number;
  str: string;
  correct: boolean;
  image: ImageSourcePropType;
}

export default function Level1() {
  const params = useLocalSearchParams();
  const [score, setScore] = useState<number>(Number(params.score));
  const [mistakes, setMistakes] = useState<number>(0);
  const [order, setOrder] = useState<Kid[]>(shuffleArray(kids));
  const [selectedChild, setSelectedChild] = useState<number>(0);
  const color = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  useEffect(() => {
    if (mistakes == 3) {
      alert("You have lost.");
      router.dismissAll();
    }
    if (score >= 34) {
      alert("You won!\nScore: " + score);
      router.dismissAll();
    }
  }, [score, mistakes]);

  function glueChild(id: number, index: number) {
    if (id == selectedChild) {
      order[index].correct = true;
      setSelectedChild(0);
      setScore(score + 1);
    } else if (selectedChild != 0) {
      setMistakes(mistakes + 1);
    }
  }

  return (
    <ThemedView style={styles.main}>
      <ThemedView style={styles.topBar}>
        <Pressable style={styles.barIcon} onPress={() => router.dismissAll()}>
          <Text>
            <MaterialIcons size={28} name="arrow-back" color="black" />
          </Text>
        </Pressable>
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          Place the stickers{"\n"}in the correct box:
        </ThemedText>
        <Pressable>
          <Text></Text>
        </Pressable>
      </ThemedView>
      <ThemedView style={{ flexDirection: "row", gap: 30 }}>
        <ThemedText type="defaultSemiBold">Score: {score}/34</ThemedText>
        <ThemedText type="defaultSemiBold">Mistakes: {mistakes}/3</ThemedText>
      </ThemedView>
      <ThemedView style={styles.boxContainer}>
        {order.map((kid, index) => (
          <Pressable
            key={kid.id}
            style={styles.dropzone}
            onPress={() => glueChild(kid.id, index)}
          >
            <ThemedText style={styles.boxText}>{kid.str} Child</ThemedText>
            <ThemedView
              style={[
                styles.box,
                { backgroundColor: kid.correct ? "#b58df1" : "transparent" },
              ]}
            >
              <Image
                source={kid.image}
                style={[
                  styles.image,
                  {
                    width: imageSize / 3.5,
                    height: 100,
                    opacity: kid.correct ? 100 : 0,
                  },
                ]}
                resizeMode="contain"
              />
            </ThemedView>
          </Pressable>
        ))}
      </ThemedView>
      <ThemedView style={styles.stickersContainer}>
        {kids.map((kid) => (
          <Pressable
            key={kid.id}
            style={[
              styles.sticker,
              {
                transform:
                  selectedChild == kid.id ? [{ scale: 1.2 }] : [{ scale: 1 }],
              },
            ]}
            onPress={() =>
              selectedChild == kid.id
                ? setSelectedChild(0)
                : setSelectedChild(kid.id)
            }
          >
            <Image
              source={kid.image}
              style={[styles.image, { width: imageSize / 3.5, height: 100 }]}
              resizeMode="contain"
            />
          </Pressable>
        ))}
      </ThemedView>
      <Image
        source={require("../assets/images/kids/kids.png")}
        style={[
          styles.image,
          { width: imageSize * 1.5, height: undefined, aspectRatio: 2 },
        ]}
        resizeMode="contain"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  barIcon: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    opacity: 10,
    padding: 5,
    borderRadius: 20,
  },
  main: {
    flex: 1,
    justifyContent: "space-around",
    paddingVertical: 10,
    alignItems: "center",
  },
  dropzone: {
    flexDirection: "column",
    alignItems: "center",
    width: 100,
  },
  boxText: {
    textAlign: "center",
  },
  container: {
    padding: 10,
  },
  image: {
    padding: 5,
    margin: 5,
  },
  stickersContainer: {
    flexDirection: "row",
    gap: 10,
  },
  boxContainer: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  sticker: {
    justifyContent: "center",
    backgroundColor: "#b58df1",
    borderRadius: 20,
  },
});
