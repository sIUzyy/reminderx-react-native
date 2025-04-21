import { View, StyleSheet, Alert, Platform } from "react-native";

// react
import { useCallback, useState } from "react";

// components
import LoadingModal from "../../../components/loading/LoadingModal";
import MainButton from "../../../components/buttons/MainButton";
import TextInputs from "../../../components/Inputs/TextInputs";
import InputText from "../../../components/header/InputText";

// constants
import { Color } from "../../../constants/Color";

// firebase
import { auth } from "../../../firebase/firebase";

// context
import { useAuth } from "../../../context/authContext";

// axios
import axios from "axios";

// connection of android and ios
import { android_url, ios_url } from "../../../constants/Url";
import { useFocusEffect } from "@react-navigation/native";

// host connection
const connection = Platform.OS === "android" ? `${android_url}` : `${ios_url}`;

export default function ESP32Integration({ navigation }) {
  // auth context
  const { user } = useAuth();

  // state for esp32 model id
  const [esp32Id, setEsp32Id] = useState("");

  // state to display the esp32 model (reminderx model)
  const [displayEsp32Model, setDisplayEsp32Model] = useState(null);

  // error state
  const [error, setError] = useState("");

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // handle to create a esp32 model
  const handleESP32Connection = async () => {
    setIsLoading(true);
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        if (!esp32Id) {
          setError("ESP32 Model field cannot be empty");
          setIsLoading(false);
          return;
        }

        const token = await currentUser.getIdToken();

        const esp32Data = { model: esp32Id };

        const response = await axios.post(
          `${connection}/model/createmodel`,
          esp32Data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          Alert.alert("ESP32", "ESP32 model connected successfully");

          // Delay navigation to show the spinner
          setTimeout(() => {
            navigation.navigate("Connection");
            setIsLoading(false);
          }, 2000);

          return;
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "An unexpected error occurred while connecting to ESP32. Please try again later."
      );
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  // display esp32 model
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
      // error message
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEsp32Model();
    }, [user])
  );

  return (
    <View style={styles.main_container}>
      {isLoading && <LoadingModal visible={isLoading} />}
      <View>
        <InputText style={styles.input}>ESP32 Model:</InputText>
        <TextInputs
          style={[
            styles.textInput,
            displayEsp32Model && styles.display_esp32model,
          ]}
          placeholder={String(
            error || displayEsp32Model || "Enter your ESP32 Model"
          )}
          value={esp32Id}
          onChangeText={setEsp32Id}
          placeholderTextColor={error ? Color.redColor : "#fff"}
          editable={!displayEsp32Model}
        />
      </View>

      <View style={styles.button_container}>
        <MainButton
          onPress={handleESP32Connection}
          style={[
            isLoading
              ? styles.loading_state
              : displayEsp32Model
              ? styles.connected_state
              : "",
            displayEsp32Model && styles.disabled_state, // Add the disabled state style when model is displayed
          ]}
          disabled={displayEsp32Model !== null} // Disable the button if displayEsp32Model is not null
        >
          {isLoading
            ? "Connecting..."
            : displayEsp32Model
            ? "Connected"
            : "Connect"}
        </MainButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },

  input: {
    color: Color.tagLine,
    marginBottom: 10,
  },

  textInput: {
    backgroundColor: Color.container,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 10,
    color: "#fff",
  },

  button_container: {
    marginTop: 10,
  },

  loading_state: {
    opacity: 0.5,
  },

  connected_state: {
    backgroundColor: Color.greenColor,
  },

  display_esp32model: {
    opacity: 0.7,
  },

  disabled_state: {
    opacity: 0.5,
  },
});
