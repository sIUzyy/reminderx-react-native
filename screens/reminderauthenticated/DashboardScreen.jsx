import { StyleSheet, FlatList, View, Platform } from "react-native";
import { useEffect, useState } from "react";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// components
import Userprofile from "../../components/dashboard/Userprofile";
import ReminderxConnectionOverview from "../../components/dashboard/ReminderxConnectionOverview";
import NewsArticle from "../../components/dashboard/NewsArticle";

// notification
import * as Notifications from "expo-notifications";

// connection of android and ios
import { android_url, ios_url } from "../../constants/Url";

// firebase
import { auth } from "../../firebase/firebase";

// context
import { useAuth } from "../../context/authContext";
import { useNotification } from "../../context/notificationContext";

// axios
import axios from "axios";

// connection path
const connection =
  Platform.OS === "android" ? `${android_url}/user` : `${ios_url}/user`;

export default function DashboardScreen({ navigation }) {
  // context
  const { user } = useAuth();
  const { expoPushToken } = useNotification();

  console.log(expoPushToken);

  // send the expoPushToken to backend
  const saveExpoPushToken = async () => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken();

        // send push token to backend
        if (user && expoPushToken) {
          try {
            await axios.post(
              `${connection}/token`,
              {
                expoPushToken,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
          } catch (error) {
            console.log(
              "An unexpected error occurred when sending the push token to backend",
              error
            );
          }
        }
      }
    } catch (error) {}
  };

  // call the saveExpoPushToken
  useEffect(() => {
    if (expoPushToken) {
      saveExpoPushToken();
    }
  }, [expoPushToken]);

  // handle notification tap (when user tap the notif)
  const notificationResponseListener =
    Notifications.addNotificationResponseReceivedListener((response) => {
      const { data } = response.notification.request.content;
      if (data && data.screen) {
        navigation.navigate(data.screen); // go to this screend
      }
    });

  useEffect(() => {
    return () => {
      notificationResponseListener.remove();
    };
  });

  // avoid virtualizedLists error
  const sections = [
    { key: "UserProfile", component: <Userprofile /> },
    {
      key: "ReminderxConnectionOverview",
      component: <ReminderxConnectionOverview />,
    },
    { key: "NewsArticle", component: <NewsArticle /> },
  ];

  return (
    <FlatList
      overScrollMode="never"
      bounces={false}
      style={styles.root}
      data={sections}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <View>{item.component}</View>}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.bgColor,
    paddingHorizontal: 18,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: Color.bgColor,
    borderRadius: 25,
  },

  modal_close: {
    marginTop: 20,
  },

  rx: {
    color: Color.purpleColor,
  },

  modal_close_text: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
  },

  img: {
    width: "screen",
    height: 650,
    resizeMode: "cover",
    borderRadius: 25,
    marginHorizontal: Platform.OS === "android" ? 0 : 20,
  },
});
