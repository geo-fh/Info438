import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import getRandomInt from "@/utils/random";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AudioSource, useAudioPlayer } from "expo-audio";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

const animals = [
  {
    id: 1,
    image: require("../assets/images/animals/cow.png"),
    sound: require("../assets/sounds/cow.mp3"),
  },
  {
    id: 2,
    image: require("../assets/images/animals/cat.png"),
    sound: require("../assets/sounds/cat.mp3"),
  },
  {
    id: 3,
    image: require("../assets/images/animals/dog.png"),
    sound: require("../assets/sounds/dog.mp3"),
  },
  {
    id: 4,
    image: require("../assets/images/animals/horse.png"),
    sound: require("../assets/sounds/horse.mp3"),
  },
  {
    id: 5,
    image: require("../assets/images/animals/sheep.png"),
    sound: require("../assets/sounds/sheep.mp3"),
  },
  {
    id: 6,
    image: require("../assets/images/animals/goat.png"),
    sound: require("../assets/sounds/goat.mp3"),
  },
];

const screenWidth = Dimensions.get("window").width;
const imageSize = (screenWidth - 30) / 2;

export default function Level1() {
  const [random, setRandom] = useState<number>(getRandomInt(0, 5));
  const [sound, setSound] = useState<AudioSource>(animals[random].sound);
  const player = useAudioPlayer(sound);
  const [score, setScore] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const color = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  useEffect(() => {
    setRandom(getRandomInt(0, 5));
  }, [score]);

  useEffect(() => {
    setSound(animals[random].sound);
  }, [random]);

  useEffect(() => {
    if (score != 10) playSound();
  }, [sound, score, mistakes]);

  useEffect(() => {
    if (mistakes == 3) {
      alert("You have lost.");
      router.dismissAll();
    }
    if (score >= 10) {
      router.push({ pathname: "./level2", params: { score: score } });
    }
  }, [score, mistakes]);

  function playSound() {
    player.pause();
    player.seekTo(0);
    player.play();
  }

  function checkAnswer(id: number) {
    if (id - 1 == random) {
      setScore(score + 1);
    } else {
      setMistakes(mistakes + 1);
    }
  }

  return (
    <ThemedView
      style={[{ flex: 1, justifyContent: "space-around", paddingVertical: 50 }]}
    >
      <ThemedView style={styles.topBar}>
        <Pressable style={styles.barIcon} onPress={() => router.dismissAll()}>
          <Text>
            <MaterialIcons size={28} name="arrow-back" color="black" />
          </Text>
        </Pressable>
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          Listen to the sound{"\n"}Pick the correct animal
        </ThemedText>
        <Pressable>
          <Text>
          </Text>
        </Pressable>
      </ThemedView>
      <FlatList
        style={{ flexGrow: 0 }}
        data={animals}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => checkAnswer(item.id)}>
            <Image
              source={item.image}
              style={[styles.image, { width: imageSize, height: imageSize }]}
              resizeMode="cover"
            />
          </Pressable>
        )}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      />
      <ThemedView
        style={{ flexDirection: "row", justifyContent: "space-evenly" }}
      >
        <ThemedText type="defaultSemiBold">Score: {score}/10</ThemedText>
        <ThemedText type="defaultSemiBold">Mistakes: {mistakes}/3</ThemedText>
      </ThemedView>
      <Pressable style={styles.soundButton} onPress={() => playSound()}>
        <ThemedText type="defaultSemiBold">Play Sound</ThemedText>
        <IconSymbol size={28} name="play.fill" color={color} />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  container: {
    padding: 10,
  },
  image: {
    margin: 5,
  },
  soundButton: {
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    padding: 10,
    borderRadius: 30,
    gap: 5,
  },
});
