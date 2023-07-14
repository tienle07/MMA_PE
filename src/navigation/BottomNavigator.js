import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import DetailsScreen from '../screens/DetailsScreen'
import COLORS from "../utils/colors";

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.green,
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "HomeScreen") {
            iconName = "home-filled";
          } else if (route.name === "Favorite") {
            iconName = "favorite";
          }

          return <Icon name={iconName} color={color} size={28} />;
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Favorite" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
