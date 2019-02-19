import React from "react";
import { View, Text } from "react-native";

export class NoCamera extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>No access to camera</Text>
      </View>
    );
  }
}
