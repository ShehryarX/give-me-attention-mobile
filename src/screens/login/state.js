import { observable, action } from "mobx";
import { UserStore } from "../../stores/UserStore";

export class LoginStore {
  constructor(props) {
    this.navigation = props.navigation;
  }

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
  handleLoginPress = () => {
    UserStore
      .signInUser(this.email, this.password)
      .then(() => this.navigation.navigate('Home'));
  };
}
