import { action } from "mobx";
import { ProfileController } from "../../controllers/ProfileController";

export class RequestsStore {
  @action
  confirmFriend = (username) => {
    ProfileController.addFriend(username).then(() => {
      console.log('Added friend successfully!');
    })
  }

  @action
  ignoreFriend = (username) => {
    console.log('todo: ignore friend request');
  }
};