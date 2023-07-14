import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import COLORS from "../utils/colors";
import plants from "../data/plants";
import CategoryList from "../components/CategoryList";
import CardItem from "../components/CardItem";
import { getFavoritePlantsStorage } from "../hook/favoriteHandle";

const HomeScreen = ({ navigation }) => {
  const [plantsList, setPlantsList] = React.useState(plants);
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [valueSearch, setValueSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleOnChange = (text) => {
    setValueSearch(text);
    handleSearch(text);
  };

  const handleSearch = (value) => {
    if (value?.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = plantsList.filter((plant) =>
      plant?.name?.toLowerCase().includes(value?.toLowerCase())
    );

    setSearchResults(results);
  };

  const filteredPlantsList = React.useMemo(() => {
    if (selectedCategory !== "all") {
      return plantsList.filter((plant) => plant.category === selectedCategory);
    }
    return plantsList;
  }, [plantsList, selectedCategory]);

  const displayedPlants = React.useMemo(() => {
    if (searchResults.length > 0) {
      return searchResults.filter((plant) =>
        filteredPlantsList.includes(plant)
      );
    }
    return filteredPlantsList;
  }, [filteredPlantsList, searchResults]);

  React.useEffect(() => {
    const focus = navigation.addListener("focus", async () => {
      const listStorage = await getFavoritePlantsStorage();
      const updatedPlantsList = plantsList.map((plant) => {
        const favoritePlant = listStorage.find((item) => item.id === plant.id);
        if (favoritePlant) {
          return { ...plant, favorite: true };
        }
        return { ...plant, favorite: false };
      });
      setPlantsList(updatedPlantsList);
    });

    return focus;
  }, [navigation]);



  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}
    >
      <View style={style.header}>
        <View>
          <Text style={style.welcomeText}>Welcome to</Text>
          <Text style={style.brandText}>Orchid Shop</Text>
        </View>
      </View>

      <View style={{ marginTop: 30, flexDirection: "row" }}>
        <View style={style.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput
            placeholder="Search"
            style={style.input}
            value={valueSearch}
            onChangeText={handleOnChange}
          />
        </View>
        <View style={style.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View>
      </View>

      <CategoryList onCategorySelect={handleCategorySelect} />

      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={
          valueSearch.length === 0
            ? selectedCategory !== "all"
              ? displayedPlants
              : plantsList
            : searchResults.length > 0
              ? displayedPlants
              : searchResults
        }
        renderItem={({ item }) => {
          return <CardItem navigation={navigation} plant={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  brandText: {
    fontSize: 38,
    color: COLORS.green,
    fontWeight: "bold",
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
