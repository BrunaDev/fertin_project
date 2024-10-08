import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import Routes from './src/routes/stack_routes';
import { LockProvider } from "./src/pages/houseState/LockContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LockProvider>
        <NavigationContainer>
          <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
          <Routes />
        </NavigationContainer>
      </LockProvider>
    </GestureHandlerRootView>
  );
}