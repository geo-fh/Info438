import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import shuffleArray from "@/utils/shuffleArray";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text
} from "react-native";

interface Shape {
  id: number;
  name: string;
  image: ImageSourcePropType;
}

const shapes = [
  {
    id: 1,
    name: "Blue Rectangle",
    image: require("../assets/images/shapes/blue-rectangle.png"),
  },
  {
    id: 2,
    name: "Yellow Circle",
    image: require("../assets/images/shapes/yellow-circle.png"),
  },
  {
    id: 3,
    name: "Blue Square",
    image: require("../assets/images/shapes/blue-square.png"),
  },
  {
    id: 4,
    name: "Black Diamond",
    image: require("../assets/images/shapes/black-diamond.png"),
  },
  {
    id: 5,
    name: "Blue Diamond",
    image: require("../assets/images/shapes/blue-diamond.png"),
  },
  {
    id: 6,
    name: "Red Triangle",
    image: require("../assets/images/shapes/red-triangle.png"),
  },
  {
    id: 7,
    name: "Orange Circle",
    image: require("../assets/images/shapes/orange-circle.png"),
  },
  {
    id: 8,
    name: "Black Square",
    image: require("../assets/images/shapes/black-square.png"),
  },
  {
    id: 9,
    name: "Purple Circle",
    image: require("../assets/images/shapes/purple-circle.png"),
  },
  {
    id: 10,
    name: "Black Triangle",
    image: require("../assets/images/shapes/black-triangle.png"),
  },
  {
    id: 11,
    name: "Blue Triangle",
    image: require("../assets/images/shapes/blue-triangle.png"),
  },
  {
    id: 12,
    name: "Yellow Rectangle",
    image: require("../assets/images/shapes/yellow-rectangle.png"),
  },
  {
    id: 13,
    name: "Red Square",
    image: require("../assets/images/shapes/red-square.png"),
  },
  {
    id: 14,
    name: "Green Diamond",
    image: require("../assets/images/shapes/green-diamond.png"),
  },
  {
    id: 15,
    name: "Purple Triangle",
    image: require("../assets/images/shapes/purple-triangle.png"),
  },
  {
    id: 16,
    name: "Orange Rectangle",
    image: require("../assets/images/shapes/orange-rectangle.png"),
  },
];

const screenWidth = Dimensions.get("window").width;
const imageSize = (screenWidth - 60) / 4;

export default function Level1() {
  const params = useLocalSearchParams();
  const [displayedShapes] = useState<Shape[]>(shuffleArray(shapes));
  const [shapeOrder] = useState<Shape[]>(shuffleArray(shapes));
  const [currShape, setCurrShape] = useState<number>(0);
  const [score, setScore] = useState<number>(Number(params.score));
  const [mistakes, setMistakes] = useState<number>(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (currShape < shapeOrder.length - 1) setCurrShape(currShape + 1);
  }, [score]);

  useEffect(() => {
    if (mistakes == 4) {
      alert("You have lost.");
      router.dismissAll();
    }
    if (score >= 29) {
      router.push({ pathname: "./level4", params: { score: score } });
    }
  }, [score, mistakes]);

  function removeImage(index: number) {
    displayedShapes[index].image = require("../assets/images/shapes/empty.png");
  }

  function shapeClicked(name: string, index: number) {
    if (name == shapeOrder[currShape].name) {
      removeImage(index);
      setScore(score + 1);
    } else if (
      displayedShapes[index].image ==
      require("../assets/images/shapes/empty.png")
    ) {
      return;
    } else {
      setMistakes(mistakes + 1);
    }
  }

  return (
    <ThemedView
      style={[
        {
          flex: 1,
          justifyContent: "space-around",
          paddingVertical: 10,
          alignItems: "center",
        },
      ]}
    >
      <ThemedView style={styles.topBar}>
        <Pressable style={styles.barIcon} onPress={() => router.dismissAll()}>
          <Text>
            <MaterialIcons size={28} name="arrow-back" color="black" />
          </Text>
        </Pressable>
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          Click the correct shape:{"\n"}
          {shapeOrder[currShape].name}
        </ThemedText>
        <Pressable>
          <Text>
          </Text>
        </Pressable>
      </ThemedView>
      <FlatList
        style={{ flexGrow: 0 }}
        data={displayedShapes}
        numColumns={4}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => shapeClicked(item.name, index)}>
            <Image
              source={item.image}
              style={[styles.image, { width: imageSize, height: imageSize }]}
              resizeMode="contain"
            />
          </Pressable>
        )}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      />
      <ThemedView style={{ flexDirection: "row", gap: 30 }}>
        <ThemedText type="defaultSemiBold">Score: {score}/29</ThemedText>
        <ThemedText type="defaultSemiBold">Mistakes: {mistakes}/4</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
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
    padding: 5,
    margin: 5,
  },
});
