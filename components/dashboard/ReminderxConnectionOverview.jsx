// react
import { useCallback, useState } from "react";

// react-native
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, Text, Image, Platform } from "react-native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// component
import LoadingModel from "../loading/LoadingModel";

// axios
import axios from "axios";

// context
import { useAuth } from "../../context/authContext";

// firebase
import { auth } from "../../firebase/firebase";

// connection of android and ios
import { android_url, ios_url } from "../../constants/Url";

// connection
const connection = Platform.OS === "android" ? `${android_url}` : `${ios_url}`;

export default function ReminderxConnectionOverview() {
  // auth context
  const { user } = useAuth();

  // state to display the esp32 model (reminderx model)
  const [displayEsp32Model, setDisplayEsp32Model] = useState(null);

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // fetch the reminderx model
  const fetchEsp32Model = async () => {
    setIsLoading(true);

    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken();

        const response = await axios.get(`${connection}/model`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDisplayEsp32Model(
          typeof response.data.esp32.model === "string"
            ? response.data.esp32.model
            : JSON.stringify(response.data.esp32.model)
        );
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fetch when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchEsp32Model(); // Fetch esp32 model when screen is focused
    }, [user])
  );

  return (
    <View>
      {isLoading ? (
        <LoadingModel />
      ) : (
        <View style={[styles.container]}>
          <View
            style={[
              styles.data_container,
              { flex: 1, justifyContent: "space-between" },
            ]}
          >
            <View style={styles.sub_container}>
              <Text
                style={[styles.text, styles.title, { color: Color.tagLine }]}
              >
                REMINDERX MODEL:{" "}
                <Text style={{ color: "#fff" }}>
                  {displayEsp32Model ? displayEsp32Model : "N/A  "}
                </Text>
              </Text>
              <View style={styles.text_container}>
                <Text
                  style={[
                    styles.text,
                    styles.data_container,
                    {
                      marginTop: 5,
                      color: displayEsp32Model
                        ? Color.greenColor
                        : Color.tagLine,
                    },
                  ]}
                >
                  {displayEsp32Model ? "CONNECTED" : "NOT CONNECTED"}
                </Text>
              </View>
            </View>
            <View style={{ marginRight: 10 }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: displayEsp32Model
                    ? Color.greenColor
                    : Color.tagLine,
                  borderRadius: 5,
                }}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.container,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 7,
    marginVertical: 20,
  },

  sub_container: {
    marginLeft: 10,
  },

  img: {
    width: 40,
    height: 40,
  },

  data_container: {
    flexDirection: "row",
    alignItems: "center",
  },

  text_container: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  title: {
    marginBottom: -3,
    fontSize: 12,
  },

  text: {
    color: "#fff",
    fontFamily: Fonts.main,
  },
});
