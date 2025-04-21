import { Text, ScrollView, StyleSheet } from "react-native";

// components
import ListPrivacyPolicy from "../../components/desc/ListPrivacyPolicy";
import WelcomePolicy from "../../components/header/WelcomePolicy";

import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView
      alwaysBounceVertical={false}
      overScrollMode="never"
      style={styles.root}
    >
      <Text style={styles.text}>
        Reminde
        <Text style={styles.rx}>
          Rx <Text style={styles.text}>Privacy Policy</Text>
        </Text>
      </Text>
      <Text style={styles.textDate}>Last Update: February 22, 2025</Text>

      <WelcomePolicy
        welcome={
          "This Privacy Policy explains how RemindeRx (“we”, “us”, or “our”) collects, uses, shares, stores, and protects your personal data when you use our mobile app, smart medicine storage solution, and integrated wearable device (SmartWatch) designed for enhanced health management. By accessing or using our Services, you agree to the practices described herein. This Policy should be read together with any applicable terms of use."
        }
      />

      <ListPrivacyPolicy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    marginVertical: 10,
    paddingHorizontal: 14,
  },

  text: {
    fontFamily: Fonts.main,
    fontSize: 16,
    color: "white",
  },

  textDate: {
    fontFamily: Fonts.mainLight,
    color: Color.tagLine,
    fontSize: 12,
  },

  rx: {
    color: Color.purpleColor,
  },
});
