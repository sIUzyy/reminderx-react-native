import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";

// components
import AuthText from "../../../../components/header/AuthText";
import MainButton from "../../../../components/buttons/MainButton";
import LoadingModal from "../../../../components/loading/LoadingModal";

// constants
import { Color } from "../../../../constants/Color";
import { Fonts } from "../../../../constants/Font";

// context
import { useReminder } from "../../../../context/reminderContext";

// firebase
import { auth } from "../../../../firebase/firebase";

// axios
import axios from "axios";

// picker
import { Picker } from "@react-native-picker/picker";

// constants
import { android_url, ios_url } from "../../../../constants/Url";

// connection of android and ios
const connection =
  Platform.OS === "android"
    ? `${android_url}/inventory`
    : `${ios_url}/inventory`;

export default function AddReminder({ navigation }) {
  const { medicationName, setMedicationName, setSelectedMedicine } =
    useReminder();

  // state
  const [medName, setMedName] = useState(medicationName);
  const [medications, setMedications] = useState([]);

  const [isHandleLoading, setisHandleLoading] = useState(false);
  const [isInventoryLoading, setIsInventoryLoading] = useState(false);

  const fetchInventory = async () => {
    setIsInventoryLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const token = await currentUser.getIdToken();

      const response = await axios.get(connection, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const inventoryList = response.data.inventory || [];
      setMedications(inventoryList);
    } catch (error) {
      console.log(error);
    } finally {
      setIsInventoryLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleMedicationName = () => {
    const selected = medications.find((item) => item.medicine_name === medName);

    if (selected) {
      setisHandleLoading(true);
      setMedicationName(medName);
      setSelectedMedicine(selected);

      setTimeout(() => {
        setisHandleLoading(false);
        navigation.navigate("OftenTake");
        setMedName("");
      }, 1000);
    } else {
      Alert.alert("Reminder", "Please select a medicine before you proceed.");
    }
  };

  const isLoading = isHandleLoading || isInventoryLoading;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        {isLoading && <LoadingModal visible={isLoading} />}

        <AuthText style={styles.text}>
          What medicine would you like to add?
        </AuthText>

        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.medText}>Select your medication name</Text>

            <View style={[styles.inputs, { paddingHorizontal: 10 }]}>
              <Picker
                selectedValue={medName}
                dropdownIconColor="#fff"
                onValueChange={(itemValue) => setMedName(itemValue)}
                style={{ color: "#fff" }}
              >
                <Picker.Item label="Select a medicine" value="" />
                {medications.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.medicine_name}
                    value={item.medicine_name}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.button_container}>
            <MainButton onPress={handleMedicationName} style={styles.button}>
              Next
            </MainButton>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: Color.container,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  subContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },

  text: {
    textTransform: "none",
    marginHorizontal: 18,
    marginBottom: 20,
    marginTop: 50,
    fontSize: 20,
    width: 320,
  },

  medText: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 15,
  },
  inputs: {
    backgroundColor: Color.bgColor,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    borderRadius: 8,
    marginTop: 10,
    color: "#fff",
  },
  button_container: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    width: "90%",
  },
});
