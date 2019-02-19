import React from "react";
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const dimensions = Dimensions.get("window");
const imageHeight = dimensions.height;
const imageWidth = dimensions.width;

export class Result extends React.Component {
  resultHotdogView() {
    return (
      <View style={styles.hotdogContainer}>
        <Text style={styles.titleHotdog}>Hotdog</Text>
        <View style={styles.hotdogHeader}>
          <Image source={require("../assets/hotdog.png")} style={styles.logo} />
        </View>
      </View>
    );
  }

  resultNotHotdogView() {
    return (
      <View style={styles.notHotdogContainer}>
        <Text style={styles.titleNotHotdog}>Not Hotdog</Text>
        <View style={styles.notHotdogFooter}>
          <Image
            source={require("../assets/nothotdog.png")}
            style={styles.logo}
          />
        </View>
      </View>
    );
  }

  render() {
    const result = this.props.isHotdog
      ? this.resultHotdogView()
      : this.resultNotHotdogView();

    return (
      <TouchableOpacity onPress={this.props.onReset} style={{ flex: 1 }}>
        <View style={styles.viewContainer}>
          <Image source={this.props.photo} style={styles.photo} />
          {result}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  hotdogContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "green",
    height: 120,
    alignItems: "center"
  },
  hotdogHeader: {
    borderRadius: 100,
    position: "absolute",
    top: 80,
    width: 120,
    height: 120,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center"
  },
  titleHotdog: {
    color: "#fff",
    fontSize: 64,
    marginTop: 32,
    zIndex: 3
  },

  notHotdogContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
    height: 120,
    alignItems: "center"
  },
  notHotdogFooter: {
    borderRadius: 100,
    position: "absolute",
    bottom: 80,
    width: 120,
    height: 120,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  titleNotHotdog: {
    color: "#fff",
    fontSize: 64,
    marginTop: 14,
    zIndex: 3
  },

  photo: { height: imageHeight, width: imageWidth },
  logo: { height: 128, width: 128 }
});
