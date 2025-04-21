import { View, Text, StyleSheet } from "react-native";

// constants
import { Fonts } from "../../constants/Font";

export default function WelcomePolicy({ welcome }) {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{welcome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 30,
    marginBottom: 20,
  },
  text: {
    fontFamily: Fonts.mainLight,
    color: "white",
    textAlign: "justify",
  },
});
