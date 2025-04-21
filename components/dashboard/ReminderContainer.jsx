import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  Alert,
  Platform,
} from "react-native";
import { useState } from "react";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// icons
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";

// axios
import axios from "axios";

// connection of android and ios
import { android_url, ios_url } from "../../constants/Url";

// connection path - PATCH
const connection =
  Platform.OS === "android"
    ? `${android_url}/reminder/`
    : `${ios_url}/reminder/`;

export default function ReminderContainer({ itemData, setRemindersUpdated }) {
  // this data is from Reminder screen
  const { _id, time, dosage, medicineName, compartment, status, specificDays } =
    itemData;

  // state for modal
  const [modalVisible, setModalVisible] = useState(false);

  // loading state
  const [deleteLoading, setDeleteLoading] = useState(false);

  // status text color
  const textColor =
    status === "taken"
      ? Color.greenColor // Green for "taken"
      : status === "skipped"
      ? Color.purpleColor // Purple for "skipped"
      : Color.tagLine; // White for default

  // Format the time for display
  const formattedTime = new Date(time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 12-hour format with AM/PM
  });

  const handleDeleteReminder = async () => {
    // show a configuration dialog
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            setDeleteLoading(true);

            try {
              // send a request to the backend
              await axios.delete(`${connection}${_id}`);

              // on success, navigate back to the reminder screen
              Alert.alert(
                "Reminder deleted",
                "The reminder was deleted successfully."
              );

              // Trigger the re-fetch by calling the passed function
              setRemindersUpdated((prevState) => !prevState); // Toggle state

              // close the modal after successful deletion
              setModalVisible(false);
            } catch (error) {
              Alert.alert(
                "Error Deleting",
                "Failed to delete the reminder. Please try again later.",
                error
              );
            } finally {
              setDeleteLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const safeDosage = Array.isArray(dosage)
    ? dosage
    : typeof dosage === "object" && dosage?.dosage
    ? [dosage.dosage]
    : dosage !== undefined && dosage !== null
    ? [dosage]
    : [];

  return (
    <View style={styles.root}>
      <View style={styles.mapContainer}>
        <Text style={styles.time}>{formattedTime}</Text>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.mainContainer}
        >
          {/* Display medicine details */}
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={
                status === "taken"
                  ? require("../../assets/others/pill_taken.png") // Image when taken
                  : status === "skipped"
                  ? require("../../assets/others/pill_skipped.png") // Image when skipped
                  : require("../../assets/others/pill.png") // Default image
              }
            />
            <View style={styles.textContainer}>
              <Text style={styles.medName}>{medicineName}</Text>
              {safeDosage.map((item, index) => {
                // Display the description based on the status
                const description =
                  status === "taken"
                    ? `Took ${item} pill(s) of ${medicineName} from compartment ${compartment}`
                    : status === "skipped"
                    ? `Skipped ${item} pill(s) of ${medicineName} from compartment ${compartment}`
                    : `Take ${item} pill(s) of ${medicineName} from compartment ${compartment}`;

                return (
                  <Text
                    key={index}
                    style={[styles.description, { color: textColor }]}
                  >
                    {description}
                  </Text>
                );
              })}
            </View>
          </View>
        </Pressable>
      </View>

      {/* Modal Section */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modal_header}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={30} color="white" />
              </Pressable>

              <Pressable onPress={handleDeleteReminder}>
                {deleteLoading ? (
                  <Ionicons
                    name="trash-sharp"
                    size={22}
                    color={Color.container}
                  />
                ) : (
                  <Ionicons
                    name="trash-sharp"
                    size={22}
                    color={Color.redColor}
                  />
                )}
              </Pressable>
            </View>

            <View style={styles.modalHeader}>
              <Image
                style={styles.img}
                source={
                  status === "taken"
                    ? require("../../assets/others/pill_taken.png") // Image when taken
                    : status === "skipped"
                    ? require("../../assets/others/pill_skipped.png") // Image when skipped
                    : require("../../assets/others/pill.png") // Default image
                }
              />
              <Text style={styles.modalTitle}>{medicineName}</Text>
            </View>

            <View>
              {status === "taken" || status === "skipped" ? (
                <Text style={[styles.status_text, { color: textColor }]}>
                  <Text style={styles.status}>{status}</Text> at {formattedTime}
                  , today.
                </Text>
              ) : (
                <View style={styles.info_status}>
                  <View style={styles.infoContainer}>
                    <AntDesign name="dropbox" size={24} color="#fff" />
                    <Text style={styles.modalTime}>
                      Pick a medicine in compartment {compartment}
                    </Text>
                  </View>

                  <View style={styles.infoContainer}>
                    <MaterialIcons name="schedule" size={24} color="#fff" />
                    <Text style={styles.modalTime}>
                      Scheduled for{" "}
                      {specificDays.length > 0
                        ? `${specificDays.join(", ")} at ${formattedTime}` // Show specific days and formattedTime
                        : `today at ${formattedTime}`}{" "}
                      {/* Default to "today" if no specific days */}
                    </Text>
                  </View>

                  <View style={styles.infoContainer}>
                    <MaterialCommunityIcons
                      name="pill"
                      size={24}
                      color="#fff"
                    />
                    {safeDosage.map((item, index) => (
                      <Text key={index} style={styles.modalDescription}>
                        Take {item} pill(s)
                      </Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    marginBottom: 13,
  },

  root: {
    flex: 1,
    marginVertical: 10,
  },

  mainContainer: {
    backgroundColor: Color.container,
    paddingVertical: 15,
    alignItems: "flex-start",
    borderRadius: 10,
  },

  time: {
    fontFamily: Fonts.main,
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },

  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 20,
  },

  img: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },

  textContainer: {
    marginLeft: 10,
  },

  medName: {
    fontFamily: Fonts.main,
    fontSize: 16,
    color: "#fff",
    textTransform: "capitalize",
  },

  description: {
    fontFamily: Fonts.main,
    fontSize: 12,
    width: 255,
    marginTop: 5,
  },

  textDesc: {
    textTransform: "capitalize",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: Color.bgColor,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },

  modal_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 310,
  },
  modalHeader: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  modalTitle: {
    fontFamily: Fonts.main,
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
    textTransform: "capitalize",
  },

  status: {
    textTransform: "capitalize",
  },

  status_text: {
    fontFamily: Fonts.main,
    fontSize: 16,
    textAlign: "center",
  },

  info_status: {
    width: 295,
  },

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  modalTime: {
    color: Color.tagLine,
    fontFamily: Fonts.main,
    marginLeft: 10,
  },

  modalDescription: {
    color: Color.tagLine,
    fontFamily: Fonts.main,
    marginLeft: 10,
  },
});
