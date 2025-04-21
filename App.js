import React, { lazy, Suspense, useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import {
  Fontisto,
  Feather,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome6,
  Ionicons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

// Context
import AuthContextProvider, { useAuth } from "./context/authContext";
import UserContextProvider from "./context/userContext";
import ReminderContextProvider from "./context/reminderContext";
import LocationContextProvider from "./context/locationContext";
import NotificationContextProvider from "./context/notificationContext";

// Screens
import ReminderAuthStack from "./stack/ReminderAuthStack";
import ReminderAppAuthenticated from "./stack/ReminderAppAuthenticated";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Font loading configuration
const fontAssets = {
  "work-sans": require("./assets/fonts/WorkSans-Bold.ttf"),
  "work-light": require("./assets/fonts/WorkSans-Light.ttf"),
  ...Fontisto.font,
  ...Feather.font,
  ...Entypo.font,
  ...MaterialCommunityIcons.font,
  ...MaterialIcons.font,
  ...FontAwesome6.font,
  ...FontAwesome.font,
  ...Ionicons.font,
  ...AntDesign.font,
};

function ReminderNavigation() {
  const { user, isLoading, isEmailVerified } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsAuthChecked(true);
    }
  }, [isLoading]);

  if (!isAuthChecked) {
    return null;
  }

  return (
    <Suspense fallback={""}>
      {user ? (
        isEmailVerified ? (
          <ReminderAppAuthenticated />
        ) : (
          <ReminderAuthStack />
        )
      ) : (
        <ReminderAuthStack />
      )}
    </Suspense>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const loadResources = useCallback(async () => {
    try {
      await Font.loadAsync(fontAssets);
    } catch (err) {
      console.warn(err);
    } finally {
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    }
  }, []);

  useEffect(() => {
    loadResources();
  }, [loadResources]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <NotificationContextProvider>
          <LocationContextProvider>
            <UserContextProvider>
              <AuthContextProvider>
                <ReminderContextProvider>
                  <ReminderNavigation />
                </ReminderContextProvider>
              </AuthContextProvider>
            </UserContextProvider>
          </LocationContextProvider>
        </NotificationContextProvider>
      </NavigationContainer>
    </>
  );
}
