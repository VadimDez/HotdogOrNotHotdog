import React from "react";
import { Dimensions, View, Text, Image } from "react-native";

const dimensions = Dimensions.get("window");
const imageHeight = dimensions.height;
const imageWidth = dimensions.width;

export class Evaluating extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <Image
          source={this.props.photo}
          style={{ height: imageHeight, width: imageWidth, opacity: 0.5 }}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              backgroundColor: "transparent",
              fontWeight: "bold",
              fontSize: 38
            }}
          >
            Evaluating...
          </Text>
        </View>
      </View>
    );
  }
}
