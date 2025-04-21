import { View, StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
import AuthText from "../header/AuthText";

export default function LoadingNews() {
  return (
    <View style={styles.root}>
      <AuthText style={styles.header_text}>News Articles</AuthText>
      <View style={styles.containerEmpty}>
        <View style={styles.imgEmpty}></View>
        <View style={{ marginLeft: 10 }}>
          <View style={styles.textEmpty}></View>
          <View style={styles.headlineEmpty}></View>
          <View style={[styles.headlineEmpty, { marginTop: 10 }]}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 20,
  },

  containerEmpty: {
    flex: 1,
    marginTop: 10,
    backgroundColor: Color.container,
    borderRadius: 8,
    width: "screen",
    height: 120,
    padding: 10,
    flexDirection: "row",
  },

  header_text: {
    fontSize: 18,
  },

  imgEmpty: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: Color.bgColor,
  },

  textEmpty: {
    width: 120,
    backgroundColor: Color.bgColor,
    height: 20,
    borderRadius: 50,
    marginBottom: 10,
  },

  headlineEmpty: {
    width: 200,
    backgroundColor: Color.bgColor,
    height: 20,
    borderRadius: 50,
    marginBottom: 3,
  },
});
