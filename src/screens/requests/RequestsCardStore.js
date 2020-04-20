import { observable, action } from "mobx";
import { ProfileController } from "../../controllers/ProfileController";

export class RequestsCardStore {
  constructor(props) {
    this.props = props;
  }

  @observable
  profilePictureURL = "";
};