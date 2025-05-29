import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import getRandomInt from "@/utils/random";
import shuffleArray from "@/utils/shuffleArray";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";

const pencils = [
  {
    id: 1,
    color: "Red",
    image: require("../assets/images/pencils/pencilred.png"),
  },
  {
    id: 2,
    color: "Yellow",
    image: require("../assets/images/pencils/pencilyellow.png"),
  },
  {
    id: 3,
    color: "Blue",
    image: require("../assets/images/pencils/pencilblue.png"),
  },
];

interface Shape {
  id: number;
  shape: string;
}

const shapes = [
  { id: 1, shape: "Circle" },
  { id: 2, shape: "Square" },
  { id: 3, shape: "Triangle" },
];

const shapeSize = 100;
const shapeDiff = 10;
const outlineSize = shapeSize + shapeDiff;

export default function Level2() {
  const color = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  const [arrShapes, setArrShapes] = useState<Shape[]>(shuffleArray(shapes));
  const params = useLocalSearchParams();
  const [picked, setPicked] = useState<number>(0);
  const [circColor, setCircColor] = useState<number>(0);
  const [rectColor, setRectColor] = useState<number>(0);
  const [triColor, setTriColor] = useState<number>(0);
  const [randomShape, setRandomShape] = useState<number>(0);
  const [randomColor, setRandomColor] = useState<number>(getRandomInt(0, 2));
  const [score, setScore] = useState<number>(Number(params.score));
  const [mistakes, setMistakes] = useState<number>(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (randomShape < 2) setRandomShape(randomShape + 1);
    setRandomColor(getRandomInt(0, 2));
  }, [score]);

  useEffect(() => {
    if (mistakes == 3) {
      alert("You have lost.");
      router.dismissAll();
    }
    if (score >= 13) {
      router.push({ pathname: "./level3", params: { score: score } });
    }
  }, [score, mistakes]);

  function fillShape(shapeId: number) {
    if (shapeId == arrShapes[randomShape].id && picked == randomColor + 1) {
      switch (shapeId) {
        case 1:
          setCircColor(randomColor + 1);
          break;
        case 2:
          setRectColor(randomColor + 1);
          break;
        case 3:
          setTriColor(randomColor + 1);
          break;
        default:
          alert("Error");
      }
      setScore(score + 1);
    } else {
      setMistakes(mistakes + 1);
    }
  }

  return (
    <ThemedView
      style={[{ flex: 1, flexDirection: "column", paddingVertical: 50 }]}
    >
      <ThemedView style={styles.topBar}>
        <Pressable style={styles.barIcon} onPress={() => router.dismissAll()}>
          <Text>
            <MaterialIcons size={28} name="arrow-back" color="black" />
          </Text>
        </Pressable>
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          Color the right shape:{"\n"}
          {pencils[randomColor].color} {arrShapes[randomShape].shape}
        </ThemedText>
        <Pressable>
          <Text>
          </Text>
        </Pressable>
      </ThemedView>
      <ThemedView
        style={{ flexDirection: "row", justifyContent: "space-evenly" }}
      >
        <ThemedText type="defaultSemiBold">Score: {score}/13</ThemedText>
        <ThemedText type="defaultSemiBold">Mistakes: {mistakes}/3</ThemedText>
      </ThemedView>
      <ThemedView style={styles.shapeContainer}>
        <Pressable onPress={() => fillShape(1)}>
          <ThemedView
            style={[
              styles.circle,
              {
                backgroundColor:
                  circColor == 0
                    ? "transparent"
                    : pencils[circColor - 1].color.toLowerCase(),
              },
            ]}
          />
        </Pressable>
        <Pressable onPress={() => fillShape(2)}>
          <ThemedView
            style={[
              styles.square,
              {
                backgroundColor:
                  rectColor == 0
                    ? "transparent"
                    : pencils[rectColor - 1].color.toLowerCase(),
              },
            ]}
          />
        </Pressable>
        <Pressable
          onPress={() => fillShape(3)}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <ThemedView style={styles.triangleOutline} />
          <ThemedView
            style={[
              styles.triangle,
              {
                borderBottomColor:
                  triColor == 0
                    ? color
                    : pencils[triColor - 1].color.toLowerCase(),
              },
            ]}
          />
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.pencilContainer}>
        {pencils.map((pencil) => (
          <Pressable
            key={pencil.id}
            onPress={() => setPicked(pencil.id)}
            style={{
              backgroundColor: picked == pencil.id ? "lightgrey" : undefined,
              borderRadius: 50,
              paddingVertical: 10,
              marginTop: 10,
            }}
          >
            <Image
              source={pencil.image}
              style={[styles.image]}
              resizeMode="contain"
            />
          </Pressable>
        ))}
      </ThemedView>
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
    width: 100,
    height: 150,
  },
  shapeContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  pencilContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  circle: {
    width: shapeSize,
    height: shapeSize,
    borderRadius: shapeSize / 2,
    borderWidth: 2,
    borderColor: "grey",
  },
  square: {
    width: shapeSize,
    height: shapeSize,
    borderWidth: 2,
    borderColor: "grey",
  },
  triangle: {
    width: 0,
    height: 0,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftWidth: shapeSize / 2,
    borderRightWidth: shapeSize / 2,
    borderBottomWidth: (shapeSize * 5) / 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    zIndex: 1,
  },
  triangleOutline: {
    width: 0,
    height: 0,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftWidth: outlineSize / 2,
    borderRightWidth: outlineSize / 2,
    borderBottomWidth: (outlineSize * 5) / 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "grey",
    position: "absolute",
    left: -shapeDiff / 2,
    top: -shapeDiff / 2 - 1,
    zIndex: 0,
  },
});
