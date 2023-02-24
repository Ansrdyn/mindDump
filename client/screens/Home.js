import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import moment from "moment";

import { SafeAreaView } from "react-native";
export default function HomeScreen(params) {
  const [gift, setGift] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [originalData, setOriginalData] = useState([]);
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
  const key = "jw8yJwR9rc4g1S5SfgzMV2bE5G0qoCe5";
  const api = async () => {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${key}&rating=g`
    );
    const data = await response.json();
    setGift(data);
    setOriginalData(data.data);
    setIsLoading(false);
  };
  //   console.log(gift, `<<< gift`);
  //   console.log(originalData,`<<<`);
  useEffect(() => {
    api();
  }, []);
  const CardGift = ({ giftData }) => {
    return (
      <Card style={styles.card}>
        <Card.Cover
          source={{ uri: giftData.images.downsized.url }}
          resizeMode="cover"
        />
        <Card.Content>
          <Title style={styles.title}>{giftData.title}</Title>
          <Paragraph style={styles.paragraph}>
            {moment(giftData.trending_datetime).format("DD MMMM YYYY")}
          </Paragraph>
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
        <Navbar onSearch={handleSearch} />
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
    height: 300,
  },
  title: {
    fontSize: 20,
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
});