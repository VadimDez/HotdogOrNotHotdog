import React from "react";
import { StyleSheet } from "react-native";
import { Permissions } from "expo";
import { isHotdog } from "./service";
import { Result } from "./components/Result";
import { Evaluating } from "./components/Evaluating";
import { NoCamera } from "./components/NoCamera";
import { Camera } from "./components/Camera";

export default class App extends React.Component {
  state = {
    hasCameraPermission: false,
    hasFailure: null,
    isEvaluating: false,
    photo: null,
    isUploading: false,
    isHotdog: null,
    isFinished: null
  };

  componentDidMount() {
    this.getCameraPermissions();
  }

  getCameraPermissions() {
    Permissions.getAsync(Permissions.CAMERA).then(async r => {
      let status = r.status;

      if (status != "granted") {
        const res = await Permissions.askAsync(Permissions.CAMERA);
        status = res.status;
      }
      this.setState({
        hasCameraPermission: status === "granted"
      });
    });
  }

  /**
   * Shots a photo and checks whether it is a hotdog or not.
   */
  onCameraPress = async camera => {
    if (this.state.isUploading) {
      return;
    }

    try {
      this.setState({
        isUploading: true
      });

      const photo = await camera.takePictureAsync();

      this.setState({
        isEvaluating: true,
        photo
      });

      if (photo) {
        this.setState({
          isHotdog: await isHotdog(photo.uri)
        });
      }
    } catch (e) {
      console.log(e);

      this.setState({
        hasFailure: true
      });
    } finally {
      this.setState({
        isEvaluating: false,
        isUploading: false,
        isFinished: true
      });
    }
  };

  /**
   * Reset the state
   */
  reset = () => {
    this.setState({
      isFinished: null,
      isHotdog: null,
      photo: null,
      isEvaluating: false,
      isUploading: false
    });
  };

  render() {
    if (!this.state.hasCameraPermission) {
      return <NoCamera />;
    }

    if (this.state.isEvaluating) {
      return <Evaluating photo={this.state.photo} />;
    }

    if (this.state.isFinished) {
      return (
        <Result
          onReset={this.reset}
          isHotdog={this.state.isHotdog}
          photo={this.state.photo}
          style={styles.result}
        />
      );
    }

    return <Camera onPress={this.onCameraPress} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  result: { flex: 1 }
});
