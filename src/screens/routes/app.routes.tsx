import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../Home";
import { Game } from "../Game";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="game" component={Game} />
    </Navigator>
  )
}

