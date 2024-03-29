import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Title, Paragraph } from "react-native-paper";
import moment from "moment";
export default function HomeScreen({ navigation }) {
  const [gift, setGift] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const key = "jw8yJwR9rc4g1S5SfgzMV2bE5G0qoCe5";
  const api = async () => {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${key}&rating=g`
    );
    const data = await response.json();
    await AsyncStorage.setItem("originalData", JSON.stringify(data.data));
    setGift(data);
    setOriginalData(data.data);
    setIsLoading(false);
  };
  const handleSearch = (text) => {
    setSearchText(text);
    if (text.length > 0) {
      setGift({
        ...gift,
        data: originalData.filter((e) =>
          e.title.toLowerCase().includes(text.toLowerCase())
        ),
      });
    } else {
      setGift({
        ...gift,
        data: originalData,
      });
    }
  };
  const handleClearSearch = () => {
    setSearchText("");
    setGift({
      ...gift,
      data: originalData,
    });
  };
  useEffect(() => {
    const getOriginalData = async () => {
      const data = await AsyncStorage.getItem("originalData");
      if (data) {
        setOriginalData(JSON.parse(data));
        setGift({ data: JSON.parse(data) });
        setIsLoading(false);
      } else {
        await api();
      }
    };
    getOriginalData();
  }, []);
  const CardGift = ({ giftData }) => {
    const trendingDate = moment(giftData.trending_datetime);
    const date = trendingDate.isValid()
      ? trendingDate.format("DD MMMM YYYY")
      : moment().format("DD MMMM YYYY");
    return (
      <Card style={styles.card}>
        <Card.Cover
          source={{ uri: giftData.images.downsized.url }}
          resizeMode="contain"
          style={styles.cardCover}
        />
        <Card.Content style={styles.cardContent}>
          <Title style={styles.title}>{giftData.title}</Title>
          <Paragraph style={styles.paragraph}>{date}</Paragraph>
        </Card.Content>
      </Card>
    );
  };
  const renderData = ({ item }) => {
    return <CardGift giftData={item} />;
  };
  if (isLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }
  return (
    <>
      <SafeAreaView style={styles.area}>
        <View>
          <Navbar onSearch={handleSearch} onClear={handleClearSearch} />
          {gift.data.length > 0 ? (
            <FlatList
              data={gift.data}
              renderItem={renderData}
              keyExtractor={(item) => item.id}
              horizontal={false}
              numColumns={2}
            />
          ) : (
            <Paragraph style={styles.notFound}>Gift not found</Paragraph>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Create", { image: gift })}
            style={styles.button}
          >
            <Text style={styles.buttonText}>+ MindDump</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  card: {
    width: 180,
    height: 280,
    margin: 5,
  },
  title: {
    fontSize: 18,
    lineHeight: 18,
  },
  paragraph: {
    fontSize: 15,
  },
  loading: {
    flex: 1,
    size: "large",
    alignItems: "center",
    justifyContent: "center",
  },
  notFound: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#CCFF00",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
