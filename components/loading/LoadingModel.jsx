import { View, StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
export default function LoadingModel() {
  return (
    <View
      style={[styles.container, { marginTop: 20, marginBottom: 20 }]}
    ></View>
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
    marginBottom: 10,
    height: 60,
  },
});
