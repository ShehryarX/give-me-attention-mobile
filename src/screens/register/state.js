import { observable, action } from "mobx";
import { UserStore } from "../../stores/UserStore";

export class RegisterStore {
  @observable
  email = "";

  @observable
  username = "";

  @observable
  password = "";

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
    UserStore.createNewUser(this.email, this.username, this.password);
  };
}
