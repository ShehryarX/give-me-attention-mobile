import { observable, action } from "mobx";
import { ProfileController } from "../../controllers/ProfileController";

export class AddFriendStore {
  constructor(props) {
    this.navigation = props.navigation;
  }

  @observable
  friendUsername = "";

  @action
  handleFriendUsernameChange = (username) => {
    this.friendUsername = username;
  }

  @action
  doAddFriend = () => {
    const username = this.friendUsername;
    ProfileController.sendFriendRequestToUsername(username)
    .then(() => {
      console.log('Request sent!');
      this.navigation.navigate('Home');
    })
    .catch(err => {
      console.log('could not add friend');
      console.log(err);
    })
  }
};