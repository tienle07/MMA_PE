import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import COLORS from "../utils/colors";
import CardFavorite from "../components/CardFavorite";

import {
  getFavoritePlantsStorage,
  clearFavoritePlantsStorage,
} from "../hook/favoriteHandle";
import ModalBox from "../components/ModalBox";

const FavoritesScreen = ({ navigation }) => {
  const [favoritePlantsList, setFavoritePlantsList] = React.useState([]);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const handleClearFunction = () => {
    clearFavoritePlantsStorage();
    setFavoritePlantsList([]);
    setIsOpenModal(false);
  };

  React.useEffect(() => {
    const focus = navigation.addListener("focus", async () => {
      const list = await getFavoritePlantsStorage();
      setFavoritePlantsList(list);
    });

    return focus;
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={style.header}>
        <View>
          <Text style={style.welcomeText}>Favorites List</Text>
        </View>
      </View>

      {favoritePlantsList.length === 0 ? (
        <View style={style.emptyContainer}>
          <Text style={style.emptyText}>
            You don't have any favorite orchid yet!
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 10,
              paddingBottom: 50,
            }}
            numColumns={2}
            data={favoritePlantsList}
            renderItem={({ item }) => {
              return (
                <CardFavorite
                  navigation={navigation}
                  plant={item}
                  setFavoritePlantsList={setFavoritePlantsList}
                />
              );
            }}
          />

          {isOpenModal && (
            <ModalBox
              open={isOpenModal}
              bodyText={"Are you sure to clear all favorite list?"}
              actionClose={() => setIsOpenModal(false)}
              actionYes={handleClearFunction}
              nameNo={"Cancel"}
              nameYes={"Confirm"}
            />
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsOpenModal(true)}
          >
            <View style={style.btnContainer}>
              <Text style={style.title}>Clear Favorite List</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
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
  btnContainer: {
    backgroundColor: COLORS.green,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  title: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FavoritesScreen;
