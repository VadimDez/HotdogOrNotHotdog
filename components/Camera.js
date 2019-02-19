import React from "react";
import { TouchableOpacity } from "react-native";
import { Camera as Cam } from "expo";

export class Camera extends React.Component {
  onPress = async () => {
    if (!this.camera) {
      return;
    }

    this.props.onPress(this.camera);
  };

  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 1
        }}
        onPress={this.onPress}
      >
        <Cam
          style={{
            flex: 1
          }}
          type={Cam.Constants.Type.back}
          ref={ref => {
            this.camera = ref;
          }}
        />
      </TouchableOpacity>
    );
  }
}
