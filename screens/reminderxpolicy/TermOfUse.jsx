import { Text, StyleSheet, ScrollView } from "react-native";

// components
import WelcomePolicy from "../../components/header/WelcomePolicy";
import ListTermOfUse from "../../components/desc/ListTermOfUse";

import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function TermOfUse() {
  return (
    <ScrollView
      alwaysBounceVertical={false}
      overScrollMode="never"
      style={styles.root}
    >
      <Text style={styles.text}>
        Reminde
        <Text style={styles.rx}>
          Rx <Text style={styles.text}>Term of Use</Text>
        </Text>
      </Text>
      <Text style={styles.textDate}>Last Update: February 22, 2025</Text>
      <WelcomePolicy
        welcome={
          "Please read these Terms and Conditions carefully before using the RemindeRx mobile application, smart medicine storage system, and wearable device. By accessing or using the service, you agree to comply with these terms. If you do not agree with any part of these Terms and Conditions, you should discontinue use immediately."
        }
      />

      <ListTermOfUse />
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
