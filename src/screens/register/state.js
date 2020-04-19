import { observable, action } from "mobx";
import { UserStore } from "../../stores/UserStore";
import ImagePicker from "react-native-image-picker";
import * as firebase from "firebase";

import { Platform } from "react-native";
import { check, PERMISSIONS, request } from "react-native-permissions";

export class RegisterStore {
  @observable
  email = "";

  @observable
  username = "";

  @observable
  password = "";

  @observable
  avatar = "";

  @action
  handleEmailChange = (newEmail) => {
    this.email = newEmail;
  };

  @action
  handleUsernameChange = (newUsername) => {
    this.username = newUsername;
  };

  @action
  handlePasswordChange = (newPassword) => {
    this.password = newPassword;
  };

  @action
  handleCreateUserAccount = () => {
    UserStore.createNewUser(
      this.email,
      this.username,
      this.password,
      this.avatar
    );
  };

  @action
  handlePickAvatar = async () => {
    // Get permission
    check(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then((result) => {
        console.log(result);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              "This feature is not available (on this device / in this context)"
            );
            break;
          case RESULTS.DENIED:
            "The permission has not been requested / is denied but requestable",
              request(
                Platform.select({
                  android: PERMISSIONS.ANDROID.CAMERA,
                  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
                })
              );
            break;
          case RESULTS.GRANTED:
            console.log("The permission is granted");
            break;
          case RESULTS.BLOCKED:
            console.log("The permission is denied and not requestable anymore");
            break;
        }
      })
      .catch((error) => {
        // No errors lol
      });

    // Get the image
    const options = {
      title: "Select Avatar",
      customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        this.avatar = response.uri;
      }
    });
  };
}
