import React from "react";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";
import SelfProfileScreen from "./src/screens/SelfProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='UserProfile' component={UserProfileScreen}/>
          <Stack.Screen name='SelfProfile' component={SelfProfileScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}