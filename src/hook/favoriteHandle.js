import AsyncStorage from "@react-native-async-storage/async-storage";

const getFavoritePlantsStorage = async () => {
    try {
        const favoritePlantsString = await AsyncStorage.getItem("FAVORITE");
        if (favoritePlantsString !== null) {
            return JSON.parse(favoritePlantsString);
        } else {
            return [];
        }
    } catch (error) {
        console.log("Error fetching favorite plant: ", error);
    }
};

const setFavoritePlantsStorage = async (plant) => {
    try {
        const favoritePlants = await AsyncStorage.getItem("FAVORITE");
        let favorites = [];
        if (favoritePlants) {
            favorites = JSON.parse(favoritePlants);
        }
        favorites.push(plant);
        await AsyncStorage.setItem("FAVORITE", JSON.stringify(favorites));
    } catch (error) {
        console.log("Error add favorite plant: ", error);
    }
};

const removeFavoritePlantsStorage = async (plant, setFavoritePlantsList) => {
    try {
        const favoritePlants = await getFavoritePlantsStorage();

        const updatedFavoritePlants = favoritePlants?.filter(
            (favoritePlant) => favoritePlant.id !== plant.id
        );

        await AsyncStorage.setItem(
            "FAVORITE",
            JSON.stringify(updatedFavoritePlants)
        );

        if (setFavoritePlantsList) {
            setFavoritePlantsList(updatedFavoritePlants);
        }
    } catch (error) {
        console.log("Error removing favorite plant:", error);
    }
};

const clearFavoritePlantsStorage = async () => {
    AsyncStorage.clear();
};

export {
    getFavoritePlantsStorage,
    setFavoritePlantsStorage,
    removeFavoritePlantsStorage,
    clearFavoritePlantsStorage,
};
