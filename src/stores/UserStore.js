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
        firebase
          .messaging()
          .subscribeToTopic(this.username)
          .then(() => Logger.log(`Subscribed to topic ${username}!`));
        firebase.messaging().onMessage((payload) => {
          console.log("Message received. ", payload);
        });
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
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return firebase
          .database()
          .ref("/")
          .child("users")
          .orderByChild("email")
          .equalTo(email.toLowerCase())
          .on("value", async (snapshot) => {
            const databaseVal = snapshot.val();
            this.uid = firebase.auth().currentUser.uid;
            this.isUserSignedIn = true;
            this.username =
              databaseVal[Object.keys(databaseVal)[0]]["username"];
            this.userAvatar = await ProfileController.getProfilePictureURL(
              this.username
            );
            const friends = databaseVal[this.username]["friends"];
            //this.friendsList = await Promise.all(Object.values(friends).pop().map());
            this.friendsList = [];
            Object.values(friends).forEach(async (friend) => {
              if (friend.username) {
                let username = friend.username;
                let userObj = await ProfileController.getProfileByUsername(
                  username
                );
                userObj = userObj[username];
                let pictureURL = await ProfileController.getProfilePictureURL(
                  username
                );
                userObj.pictureURL = pictureURL;
                this.friendsList.push(userObj);
                console.log(this.friendsList);
              }
            });
            this.friendRequestsList =
              databaseVal[this.username]["friendRequests"];
            firebase
              .messaging()
              .subscribeToTopic(this.username)
              .then(() => Logger.log(`Subscribed to topic ${username}!`));
            firebase.messaging().onMessage((payload) => {
              console.log("Message received. ", payload);
            });
          });
      })
      .catch((err) => {
        console.log(err);
        this.setError(true, "Incorrect password");
      });
  }

  @action
  signOut() {
    this.isUserSignedIn = false;
  }
}

export const UserStore = new UserStoreImpl();
