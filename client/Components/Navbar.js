import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
export default function Navbar({ onSearch }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    setSearchText("");
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {!showSearchBar && <Text style={styles.text}>MindDump</Text>}
        {showSearchBar && (
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => onSearch(text)}
            placeholder="Search"
            autoFocus={true}
          />
        )}
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={"#ccd0d5"}
          onPress={toggleSearchBar}
          style={styles.search_icon}
        >
          <Icon name="search" style={styles.search} />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 35,
    marginLeft: 10,
    fontWeight: "bold",
  },
  search: {
    fontSize: 25,
    color: "#00000",
  },
  search_icon: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
  },
});
