import * as firebase from "firebase";
import { UserStore } from "../stores/UserStore";
import { Logger } from "../logging/Logger";

class ProfileControllerImpl {
  async doesProfileWithUsernameExist(username) {
    const snapshot = await firebase
      .database()
      .ref("/")
      .child("users")
      .orderByChild("username")
      .equalTo(username)
      .once("value");

    return snapshot.exists();
  }

  async getProfileByUsername(username) {
    const snapshot = await firebase
      .database()
      .ref("/")
      .child("users")
      .orderByChild("username")
      .equalTo(username)
      .once("value");

    return snapshot.val();
  }

  async getProfilePictureURL(username) {
    return await firebase
      .storage()
      .ref(`users/${username}/avatar/profile_pic.jpg`)
      .getDownloadURL();
  }

  async doesUserExistAsFriend(friendUsername) {
    const snapshot = await firebase
      .database()
      .ref("/")
      .child(`users/${UserStore.username}/`)
      .child("friends")
      .orderByChild("username")
      .equalTo(friendUsername)
      .once("value");

    return snapshot.exists();
  }

  async assertUsernameExists(username) {
    const doesUserExist = await this.doesProfileWithUsernameExist(username);

    if (!doesUserExist) {
      Logger.error(`User ${username} does not exist.`);
      throw new Error("Unable to find username");
    }
  }

  async assertUsernameDoesNotExist(username) {
    const doesUserExist = await this.doesProfileWithUsernameExist(username);

    if (doesUserExist) {
      Logger.error(`User ${username} does exist.`);
      throw new Error("Unable to find username");
    }
  }

  async sendFriendRequestToUsername(friendUsername) {
    await this.assertUsernameExists(friendUsername);

    return firebase
      .database()
      .ref(`users/${friendUsername}/friendRequests/`)
      .push({
        username: UserStore.username,
      });
  }

  async addFriend(friendUsername) {
    await this.assertUsernameExists(friendUsername);

    await firebase
      .database()
      .ref("/")
      .child(`users/${UserStore.username}/`)
      .child("friendRequests")
      .orderByChild("username")
      .equalTo(friendUsername)
      .once("value", (snapshot) =>
        snapshot.forEach((child) => child.ref.remove())
      );

    await firebase.database().ref(`users/${UserStore.username}/friends/`).push({
      username: friendUsername,
    });

    await firebase.database().ref(`users/${friendUsername}/friends/`).push({
      username: UserStore.username,
    });
  }

  async removeFriend(friendUsername) {
    await this.assertUsernameExists(friendUsername);

    await firebase
      .database()
      .ref("/")
      .child(`users/${UserStore.username}/`)
      .child("friends")
      .orderByChild("username")
      .equalTo(friendUsername)
      .once("value", (snapshot) =>
        snapshot.forEach((child) => child.ref.remove())
      );
  }
}

export const ProfileController = new ProfileControllerImpl();
