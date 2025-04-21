import { View, StyleSheet, FlatList, Platform } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback, useRef, useEffect } from "react";

// image empty
import EmptyImage from "../../assets/others/reminder.png";

// constants
import { Color } from "../../constants/Color";

// component
import CalendarList from "../../components/dashboard/CalendarList";
import MainButton from "../../components/buttons/MainButton";
import ReminderContainer from "../../components/dashboard/ReminderContainer";
import IsEmpty from "../../components/dashboard/isEmpty";
import ErrorComponent from "../../components/dashboard/ErrorComponent";
import LoadingReminder from "../../components/loading/LoadingReminder";

// axios
import axios from "axios";

// auth context
import { useAuth } from "../../context/authContext";

// firebase
import { auth } from "../../firebase/firebase";

// moment
import moment from "moment";

// connection of android and ios
import { android_url, ios_url } from "../../constants/Url";

// connection path
const connection =
  Platform.OS === "android" ? `${android_url}/reminder` : `${ios_url}/reminder`;

export default function ReminderScreen({ navigation }) {
  // context
  const { user } = useAuth();

  // state for displaying reminder
  const [displayReminder, setDisplayReminder] = useState([]);

  // track the reminders if its alr updated
  const [remindersUpdated, setRemindersUpdated] = useState(false);

  const [isInitialLoading, setIsInitialLoading] = useState(true); // for first load
  const [isRefreshing, setIsRefreshing] = useState(false); // for auto-refresh
  const [error, setError] = useState(""); // error state

  // state to select a date in calendar
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  // Ref for the interval
  const intervalRef = useRef(null);

  // fetch all the data from reminder collection, also specified by day.
  const fetchReminder = async (isAutoRefresh = false) => {
    if (isAutoRefresh) {
      setIsRefreshing(true);
    } else {
      setIsInitialLoading(true);
    }

    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken();
        const response = await axios.get(connection, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const selectedDay = moment(selectedDate).format("dddd");

        const filteredReminders = response.data.reminder.filter((reminder) => {
          if (reminder.specificDays.length === 0) {
            return true; // Show every day
          }
          return reminder.specificDays.includes(selectedDay);
        });

        const flattenedReminders = filteredReminders
          .flatMap((reminder) => {
            const reminderTimes = Array.isArray(reminder.times)
              ? reminder.times
              : [];

            return reminderTimes.map((time, index) => {
              const todayDate = moment(selectedDate).format("YYYY-MM-DD");
              const dosageTimeKey = moment.utc(time).format("YYYY-MM-DDTHH:mm");

              const historyForTime = (reminder.history || []).find((entry) => {
                return (
                  entry.forDate === todayDate &&
                  moment.utc(entry.forTime).format("YYYY-MM-DDTHH:mm") ===
                    dosageTimeKey
                );
              });

              const status = historyForTime ? historyForTime.status : "pending";

              return {
                _id: reminder._id,
                time: new Date(time),
                medicineName: reminder.medicineName,
                dosage: reminder.dosage[index]?.dosage || 0,
                specificDays: reminder.specificDays,
                compartment: reminder.compartment,
                status,
              };
            });
          })
          .sort((a, b) => a.time - b.time);

        setDisplayReminder(flattenedReminders);
      }
    } catch (error) {
      if (!error.response) {
        setError(
          "Unable to connect. Please check your internet connection and try again."
        );
      } else if (error.response.status >= 400 && error.response.status < 500) {
        setError(
          `Error ${error.response.status}: ${
            error.response.data.message ||
            "An unexpected error occurred. Please try again later."
          }`
        );
      } else if (error.response.status >= 500) {
        setError(
          `Error ${error.response.status}: ${
            error.response.data.message ||
            "An unexpected error occurred on the server."
          }`
        );
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      if (isAutoRefresh) {
        setIsRefreshing(false);
      } else {
        setIsInitialLoading(false);
      }
    }
  };

  // Start the interval for auto-refetch
  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      fetchReminder(true); // pass true to indicate it's an auto-refresh
    }, 10000); // 10 seconds
  };

  // Stop the interval
  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Effect to handle interval when component mounts/unmounts
  useEffect(() => {
    fetchReminder(); // initial load
    startInterval();
    return () => stopInterval();
  }, []);

  // Effect to restart interval when dependencies change
  useEffect(() => {
    fetchReminder(); // fetch when dependencies change
    startInterval();
  }, [user, selectedDate, remindersUpdated]);

  // auto re-fetch when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchReminder();
      startInterval();
      return () => stopInterval();
    }, [user, selectedDate, remindersUpdated])
  );
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <CalendarList
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        {error ? (
          <View style={styles.error}>
            <ErrorComponent message={error} />
          </View>
        ) : isInitialLoading ? (
          <LoadingReminder />
        ) : displayReminder && displayReminder.length > 0 ? (
          <FlatList
            alwaysBounceVertical={false}
            bounces={false}
            overScrollMode="never"
            data={displayReminder}
            keyExtractor={(item, index) =>
              `${item.time}-${item.medicineName}-${index}`
            }
            renderItem={({ item }) => (
              <ReminderContainer
                itemData={item}
                setRemindersUpdated={setRemindersUpdated}
              />
            )}
            showsVerticalScrollIndicator={false}
            refreshing={isRefreshing}
          />
        ) : (
          <View style={styles.empty}>
            <IsEmpty
              image={EmptyImage}
              message={"No upcoming reminders for today"}
            />
          </View>
        )}
      </View>

      <MainButton
        onPress={() => navigation.navigate("AddReminder")}
        style={styles.button}
      >
        Add Reminder
      </MainButton>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.bgColor,
    paddingHorizontal: 18,
    justifyContent: "space-between",
  },

  container: {
    flex: 1,
  },

  button: {
    marginTop: 30,
    marginBottom: 40,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
  },

  error: {
    flex: 1,
    justifyContent: "center",
  },
});
