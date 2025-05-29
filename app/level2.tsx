import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet } from "react-native";

const pencils = [
  {
    id: 1,
    image: require("../assets/images/pencilred.png"),
  },
  {
    id: 2,
    image: require("../assets/images/pencilyellow.png"),
  },
  {
    id: 3,
    image: require("../assets/images/pencilblue.png"),
  },
];

export default function Level2() {
  return (
    <ThemedView
      style={[{ flex: 1, flexDirection: "column", paddingVertical: 50 }]}
    >
      <ThemedView style={styles.shapeContainer}>
        <Pressable style={{backgroundColor: 'red'}}>
          <Ionicons name="ellipse-outline" size={50} color="blue" />
        </Pressable>
        <Pressable style={{backgroundColor: 'red'}}>
          <Ionicons name="square-outline" size={50} color="blue" />
        </Pressable>
        <Pressable style={{backgroundColor: 'red'}}>
          <Ionicons name="triangle-outline" size={50} color="blue" />
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.pencilContainer}>
        {pencils.map((pencil) => (
          <Pressable key={pencil.id} onPress={() => alert("Hi")}>
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
  container: {
    padding: 10,
  },
  image: {
    margin: 5,
    width: 100,
    height: 200,
  },
  shapeContainer: {
    flexGrow: 1,
  },
  pencilContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "red",
  },
});
