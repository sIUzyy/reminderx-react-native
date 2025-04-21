import {
  StyleSheet,
  Text,
  Pressable,
  Image,
  Linking,
  View,
} from "react-native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function ListArticle({ itemData }) {
  const {
    source: { name },
    title,
    publishedAt,
    urlToImage,
    url,
  } = itemData;

  // go to this url..
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <Pressable onPress={handlePress} style={styles.press_container}>
      <View style={styles.container}>
        <Image source={{ uri: urlToImage }} style={styles.img} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>
            {new Date(publishedAt).toDateString()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press_container: {
    flex: 1,
    marginTop: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Color.container,
  },

  container: {
    flexDirection: "row",
  },

  img: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },

  name: {
    fontSize: 12,
    fontFamily: Fonts.mainLight,
    color: Color.tagLine,
  },

  title: {
    fontSize: 14,
    marginVertical: 8,
    fontFamily: Fonts.mainLight,
    color: "#fff",
    flexShrink: 1,
    flexWrap: "wrap",
  },

  date: {
    color: Color.tagLine,
    fontFamily: Fonts.mainLight,
    fontSize: 12,
  },
});
