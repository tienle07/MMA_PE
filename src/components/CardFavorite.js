import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../utils/colors";
import ModalBox from "./ModalBox";
const width = Dimensions.get("window").width / 2 - 30;
import { removeFavoritePlantsStorage } from "../hook/favoriteHandle";

const CardFavorite = ({ navigation, plant, setFavoritePlantsList }) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const handleRemovePress = async () => {
    removeFavoritePlantsStorage(plant, setFavoritePlantsList);
    setIsOpenModal(false)
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Details", plant)}
    >
      <View style={style.card}>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => setIsOpenModal(true)}
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <Icon name="delete" size={18} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: 100,
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: plant.image }}
            style={{ flex: 1, resizeMode: "contain", width: 130, height: 100 }}
          />
        </View>

        <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
          {plant.name}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>
            ${plant.price}
          </Text>
          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: COLORS.green,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: COLORS.white,
                fontWeight: "bold",
              }}
            >
              +
            </Text>
          </View>
        </View>
      </View>

      {isOpenModal && (
        <ModalBox
          open={isOpenModal}
          bodyText={"Are you sure to remove this orchid from favorite list?"}
          actionClose={() => setIsOpenModal(false)}
          actionYes={handleRemovePress}
          nameNo={"Cancel"}
          nameYes={"Confirm"}
        />
      )}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  card: {
    height: 225,
    width,
    backgroundColor: COLORS.light,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
});

export default CardFavorite;
