import { observable, action } from "mobx";

export class LoginStore {
  @observable
  email = "";

  @observable
  password = "";

  @action
  handleEmailChange = (newEmail) => {
    this.email = newEmail;
  };

  @action
  handlePasswordChange = (newPassword) => {
    this.password = newPassword;
  };

  @action
  handleLoginPressed = () => {
    console.log("Login button pressed");
  };
}
