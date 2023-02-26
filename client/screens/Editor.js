import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import Icon from "react-native-vector-icons/FontAwesome";

export default function EditorScreen({ navigation, route }) {
  const [editorValue, setEditorValue] = useState("");
  const editor = useRef();
  const { image } = route.params;
  // console.log(image, `<<< image`);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Create MindDump</Text>
        <Icon
          name="close"
          onPress={() => navigation.goBack()}
          style={styles.icon}
        />
      </View>
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: image.images.downsized.url }}
          style={styles.img}
        />
      </View>
      <View style={styles.editorContainer}>
        <RichToolbar editor={editor} disabled={false} />
        <RichEditor
          ref={editor}
          style={styles.editor}
          initialContentHTML={editorValue}
          editorStyle={styles.editorStyle}
          onChange={(text) => setEditorValue(text)}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    fontSize: 25,
    color: "#00000",
  },
  text: {
    fontSize: 35,
    marginLeft: 10,
    fontWeight: "bold",
  },
  editorContainer: {
    flex: 1,
  },
  editor: {
    flex: 1,
    backgroundColor: "#fff",
  },
  editorStyle: {
    borderWidth: 1,
    borderColor: "#c4c4c7",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    height: "100%",
  },
  imgContainer: {
    flex: 1,
    height: 200,
  },
  img: {
    flex: 1,
    width: "80%",
    height: "auto",
    // width: 200,
    // height: 200,
    // resizeMode: "cover",
    alignSelf: "center",
  },
  button: {
    position: "absolute",
    bottom: 20,
    width: "90%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#CCFF00",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
