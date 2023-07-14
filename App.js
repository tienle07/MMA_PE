import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import COLORS from "./utils/colors";
import StackNavigator from "./src/navigation/StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <StackNavigator />
    </NavigationContainer>
  );
}