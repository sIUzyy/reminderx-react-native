import { useEffect, useState } from "react";

// react-native
import { Platform } from "react-native";

// context
import { useAuth } from "../context/authContext";

// axops
import axios from "axios";

// connection of android and ios
import { android_url, ios_url } from "../constants/Url";

const connection = Platform.OS === "android" ? `${android_url}` : `${ios_url}`;

export const useUserData = () => {
  // auth context
  const { user } = useAuth();

  // state to store the user data
  const [userInfo, setUserInfo] = useState(null);

  // state for max sensor data
  const [heartRate, setHeartRate] = useState(null);
  const [spo2, setSpo2] = useState(null);

  // fetch the user information
  const fetchUserData = async () => {
    if (user) {
      try {
        const response = await axios.get(`${connection}/user/${user.email}`);
        setUserInfo(response.data);
        // console.log(response.data);
      } catch (error) {
        // console.log(error);
      }
    }
  };

  // fetch the max sensor average data
  const fetchAverageData = async () => {
    try {
      const response = await axios.get(`${connection}/esp32/average`);

      if (response.data) {
        setHeartRate(response.data.avgHeartRate);
        setSpo2(response.data.avgOxygen);
      } else {
        setHeartRate("N/A");
        setSpo2("N/A");
      }
    } catch (error) {
      // console.error("Error fetching average sensor data:", error);
      // setHeartRate("Error");
      // setSpo2("Error");
    }
  };

  // call the fn
  useEffect(() => {
    if (!userInfo) {
      // if user data is already set we don't need to fetch again
      fetchUserData();
    }
    fetchAverageData();
  }, [user]);

  // get the user data thru fetching
  const name = userInfo && userInfo.name;
  const age = userInfo && userInfo.age;

  return {
    name,
    age,
    email: user?.email || "Email address not found",
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }),
    avgPulseRate: heartRate,
    avgOxygen: spo2,
  };
};
