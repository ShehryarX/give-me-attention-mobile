import { AsyncStorage } from "react-native";
import { ProfileController } from "./ProfileController";
import { UserStore } from "../stores/UserStore";
import moment from "moment";
import { Logger } from "../logging/Logger";
import * as firebase from "firebase";

class ProfileActionController {
  async pingFriend(friendUsername) {
    const isUserAFriend = await ProfileController.doesUserExistAsFriend(
      friendUsername
    );

    if (!isUserAFriend) {
      Logger.log(`${friendUsername} is not a friend!`);
      return;
    }

    const storageKey = `${UserStore.username}-${friendUsername}`;

    const previousPings = AsyncStorage.getItem(storageKey);

    if (previousPings == null) {
      previousPings = [];
    }

    Logger.log(
      `Attempting to push to messages with retrieved async storage item ${previousPings}`
    );

    if (
      previousPings.length <= 5 ||
      moment.duration(previousPings[previousPings.length - 1]).asMinutes() > 30
    ) {
      Logger.log("Pushing to messages/");
      firebase.database().ref("/messages/").push({
        to: friendUsername,
        from: UserStore.username,
      });

      previousPings.append(moment().toDate());

      if (previousPings.length > 6) {
        previousPings.shift();
      }

      const newPings = await AsyncStorage.setItem(storageKey, previousPings);
      Logger.log(
        `${UserStore.username} pinged ${friendUsername} with log: ${newPings}`
      );
    } else {
      Logger.error(
        `${UserStore.username} tried to ping ${friendUsername} with log: ${previousPings}`
      );
    }
  }
}

export const ProfileActionController = new ProfileActionController();
