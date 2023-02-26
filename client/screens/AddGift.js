import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Card, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
export default function CreateMindDump({ navigation, route }) {
  const { image } = route.params;
  const [searchGift, setSearchGift] = useState("");
  const [selectedGift, setSelectedGift] = useState(null);
  const { width } = Dimensions.get("window");
  const cardMargin = 10;
  const cardWidth = (width - cardMargin * 5) / 3;
  const cardHeight = cardWidth;
  const FindGift = ({ giftData }) => {
    const isSelected = selectedGift?.id === giftData.id;
    return (
      <TouchableOpacity onPress={() => setSelectedGift(giftData)}>
        <Card
          style={[
            styles.card,
            { width: cardWidth, height: cardHeight },
            isSelected && styles.selectedCard,
          ]}
        >
          <Card.Cover
            source={{ uri: giftData.images.downsized.url }}
            resizeMode="cover"
            style={{ width: cardWidth, height: cardHeight }}
          />
          <Title style={styles.title}>{giftData.title}</Title>
        </Card>
      </TouchableOpacity>
    );
  };
  const renderData = ({ item }) => {
    if (
      searchGift !== "" &&
      !item.title.toLowerCase().includes(searchGift.toLowerCase())
    ) {
      return null;
    }
    return <FindGift giftData={item} />;
  };

  const handleSelect = () => {
    if (selectedGift) {
      navigation.navigate("Editor", { image: selectedGift });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Create MindDump</Text>
        <Icon
          name="close"
          onPress={() => navigation.navigate("Home")}
          style={styles.icon}
        />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Find a GIF"
          value={searchGift}
          onChangeText={(text) => setSearchGift(text)}
          style={styles.searchBox}
        />
      </View>
      <FlatList
        data={image.data}
        renderItem={renderData}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={3}
        style={styles.flatList}
        contentContainerStyle={{ padding: 10 }}
      />
      <TouchableOpacity onPress={handleSelect} style={styles.button}>
        <Text style={styles.buttonText}>Select a GIFT</Text>
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
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  searchBox: {
    fontSize: 20,
    width: "90%",
    height: 50,
    backgroundColor: "#F7F7F7",
    borderRadius: 15,
    paddingLeft: 20,
  },
  flatList: {
    flex: 1,
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
  card: {
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    marginTop: 10,
    fontSize: 16,
  },
});
