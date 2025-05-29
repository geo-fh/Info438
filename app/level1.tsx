import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AudioSource, useAudioPlayer } from "expo-audio";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

const animals = [
  {
    id: 1,
    image: require("../assets/images/cow.png"),
    sound: require("../assets/sounds/cow.mp3"),
  },
  {
    id: 2,
    image: require("../assets/images/cat.png"),
    sound: require("../assets/sounds/cat.mp3"),
  },
  {
    id: 3,
    image: require("../assets/images/dog.png"),
    sound: require("../assets/sounds/dog.mp3"),
  },
  {
    id: 4,
    image: require("../assets/images/horse.png"),
    sound: require("../assets/sounds/horse.mp3"),
  },
  {
    id: 5,
    image: require("../assets/images/sheep.png"),
    sound: require("../assets/sounds/sheep.mp3"),
  },
  {
    id: 6,
    image: require("../assets/images/goat.png"),
    sound: require("../assets/sounds/goat.mp3"),
  },
];

const screenWidth = Dimensions.get("window").width;
const imageSize = (screenWidth - 30) / 2;

export default function Level1() {
  const router = useRouter();
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
      router.back();
    }
    if (score == 1) {
      router.push("./level2");
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
      <ThemedText type="subtitle">Which one am I?</ThemedText>
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

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const styles = StyleSheet.create({
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
