import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useLayoutEffect, useState } from "react";

// constants
import { Color } from "../../../../constants/Color";
import { Fonts } from "../../../../constants/Font";

// components
import TextInputs from "../../../../components/Inputs/TextInputs";
import AuthText from "../../../../components/header/AuthText";
import MainButton from "../../../../components/buttons/MainButton";
import LoadingModal from "../../../../components/loading/LoadingModal";

// context
import { useReminder } from "../../../../context/reminderContext";

export default function AddPills({ navigation }) {
  // reminder context
  const {
    medicationName,
    frequency,
    updateDosages,
    reminderTime,
    selectedMedicine,
  } = useReminder();

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // Format reminder time as a string (example: "12:30 PM")
  const formattedReminderTimes = reminderTime.map((time) =>
    time instanceof Date
      ? time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "No time set"
  );

  const frequencyMap = {
    "Once a day": 1,
    "Twice a day": 2,
    "3 times a day": 3,
  };

  const [pillCounts, setPillCounts] = useState(
    Array(frequencyMap[frequency] || 1).fill("1")
  );

  const handlePillCountChange = (index, value) => {
    const number = parseInt(value, 10);

    // Allow empty string or numbers between 1 and 11
    if ((number >= 1 && number <= 11) || value === "") {
      const updatedPillCounts = [...pillCounts];
      updatedPillCounts[index] = value;
      setPillCounts(updatedPillCounts);
    }
  };

  const handleAddPills = () => {
    const isAnyPillCountEmpty = pillCounts.some(
      (count) => count.trim() === "" || parseInt(count) <= 0
    );

    if (isAnyPillCountEmpty) {
      Alert.alert(
        "Reminder",
        "Complete your selection by adding the necessary pill(s)."
      );
      return;
    }

    const totalPills = pillCounts.reduce((sum, val) => sum + parseInt(val), 0);
    const stock = selectedMedicine?.stock || 0;

    if (totalPills > stock) {
      Alert.alert(
        "Reminder",
        `You only have ${stock} pill(s) left in your inventory. Please refill if needed.`
      );
      return;
    }

    setIsLoading(true);

    const reminderData = reminderTime.map((time, index) => ({
      time: time.toISOString(),
      dosage: pillCounts[index],
    }));

    updateDosages(reminderData);

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("SetReminder");
    }, 1000);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.title}>{medicationName && medicationName}</Text>
      ),
    });
  }, [navigation, medicationName]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        {isLoading && <LoadingModal visible={isLoading} />}
        <AuthText style={styles.text}>
          How many pill(s) do you take at {formattedReminderTimes.join(", ")}?
        </AuthText>

        <View style={styles.container}>
          <View style={styles.subContainer}>
            {pillCounts.map((pillCount, index) => (
              <View style={styles.inputView} key={index}>
                <TextInputs
                  style={styles.input}
                  maxLength={2}
                  keyboardType={"numeric"}
                  value={pillCount}
                  onChangeText={(value) => handlePillCountChange(index, value)}
                />
                <Text style={styles.pills}>Pill(s)</Text>
              </View>
            ))}
          </View>

          <View style={styles.button_container}>
            <MainButton onPress={handleAddPills} style={styles.button}>
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
    justifyContent: "space-between",
  },

  subContainer: {
    marginHorizontal: 30,
  },

  title: {
    fontFamily: Fonts.main,
    textTransform: "capitalize",
    color: "#fff",
    fontSize: 14,
  },

  text: {
    textTransform: "none",
    marginHorizontal: 18,
    marginBottom: 20,
    marginTop: 50,
    fontSize: 20,
    width: 320,
  },

  inputView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  input: {
    backgroundColor: Color.bgColor,
    borderRadius: 8,
    color: "#fff",
    width: 100,
    textAlign: "center",
    paddingVertical: 15,
  },

  pills: {
    textAlign: "center",
    fontFamily: Fonts.main,
    fontSize: 15,
    color: Color.tagLine,
    marginTop: 5,
  },

  button_container: {
    marginBottom: 50,
    alignItems: "center",
  },

  button: {
    width: "90%",
  },
});
