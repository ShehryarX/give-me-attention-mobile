import { UserStore } from "../stores/UserStore";
import { action, observable } from "mobx";
import { observer } from "mobx-react";

@observer
class LeaderboardControllerImpl {
  @observable
  leaderboard = [];

  @action
  getLeaderboard() {
    this.leaderboard = UserStore.friendsList.sort((a, b) => {
      if (!b.notificationsReceived) {
        return 1;
      } else if (!a.notificationsReceived) {
        return -1;
      }

      if (a.notificationsReceived > b.notificationsReceived) {
        return 1;
      } else if (a.notificationsReceived < b.notificationsReceived) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}

export const LeaderboardController = new LeaderboardControllerImpl();
