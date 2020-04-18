import { observable, action } from "mobx";
import ProfileStore from "../../stores/ProfileStore";

export class HomeStore {
  @observable
  friendusername = "";

  @action
  handlefriendusernameChange = (username) => {
    this.friendusername = username;
  };

  @action
  handleAddFriend = () => {
    ProfileStore.sendFriendRequest("rishabh", this.friendusername);
  };

  @action
  GetFriendsList = () => {
    ProfileStore.returnFriendsList("rishabh");
  };

  @action
  AcceptFriendRequest = () => {
    ProfileStore.acceptFriendRequest("rishabh", this.friendusername);
  };
}
