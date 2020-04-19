import { AsyncStorage } from "react-native";
import { ProfileController } from "./ProfileController";
import { UserStore } from "../stores/UserStore";
import moment from "moment";
import { Logger } from "../logging/Logger";
import * as firebase from "firebase";

class ProfileActionController {
  async pingFriend(friendUsername) {
    await ProfileController.doesUserExistAsFriend(friendUsername);

    const storageKey = `${UserStore.username}-${friendUsername}`;

    const previousPings = AsyncStorage.getItem(storageKey);

    if (previousPings == null) {
      previousPings = [];
    }

    if (
      previousPings.length <= 5 ||
      moment.duration(previousPings[previousPings.length - 1]).asMinutes() > 30
    ) {
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
