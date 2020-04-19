import { observable, action } from "mobx";
import * as firebase from "firebase";
import { ProfileController } from "../controllers/ProfileController";
import { Logger } from "../logging/Logger";

class UserStoreImpl {
  @observable
  isUserSignedIn = false;

  @observable
  hasError = false;

  @observable
  errorMessage = null;

  @observable
  username = null;

  @observable
  uid = "";

  @observable
  friendsList = [];

  @observable
  friendRequestsList = [];

  @observable
  userAvatar = "";

  uploadPhoto = async (uri) => {
    const path = `users/${this.username}/avatar/profile_pic.jpg`;
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();
      let upload = firebase.storage().ref(path).put(file);
      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  @action
  async createNewUser(email, username, password, avatar) {
    email = email.toLowerCase();

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await ProfileController.assertUsernameDoesNotExist(email);

        firebase
          .database()
          .ref(`users/${username}`)
          .set({
            username,
            email,
            friends: {
              username: "0",
            },
            friendRequests: {
              username: "0",
            },
            notificationsReceived: "0",
          });
        this.username = username;
        this.uid = firebase.auth().currentUser.uid;
        this.isUserSignedIn = true;
        this.friendsList = this.friendRequestsList = [];
        this.uploadPhoto(avatar);
      })
      .catch(() => this.setError(true, "Error creating new user"));
  }

  @action
  setError(hasError, errorMessage) {
    Logger.log(
      `Error status changed to ${this.hasError} with messsge ${this.errorMessage}.`
    );
    this.hasError = hasError;
    this.errorMessage = errorMessage;
  }

  @action
  dismissError() {
    this.hasError = false;
    this.error = null;
  }

  @action
  signInUser(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .database()
          .ref("/")
          .child("users")
          .orderByChild("email")
          .equalTo(this.email.toLowerCase())
          .on("value", (snapshot) => {
            const databaseVal = snapshot.val();
            this.uid = firebase.auth().currentUser.uid;
            this.isUserSignedIn = true;
            this.username =
              databaseVal[Object.keys(databaseVal)[0]]["username"];
            this.friends = databaseVal[this.username]["friends"];
            this.friendRequestsList =
              databaseVal[this.username]["friendRequests"];
          });
      })
      .catch(() => this.setError(true, "Incorrect password"));
  }

  @action
  signOut() {
    this.isUserSignedIn = false;
  }
}

export const UserStore = new UserStoreImpl();
