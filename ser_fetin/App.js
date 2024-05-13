import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Routes from './src/routes/stack_routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
      <Routes/>
    </NavigationContainer>
  );
}