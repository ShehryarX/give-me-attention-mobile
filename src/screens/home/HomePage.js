import React from "react";
import { Text } from "react-native";
import { Button } from "../../common/Button";
import { FormTextInput } from "../../common/FormTextInput";
import { HomeStore } from "./state";
import { UserStore } from "../../stores/UserStore";
import { observer } from "mobx-react";

@observer
export class HomePage extends React.Component {
  state = new HomeStore();
  render() {
    return (
      <>
        <Button label="Sign Out" onPress={() => UserStore.signOut()} />
        <Text>Signed in!</Text>
        <FormTextInput
          value={this.state.friendusername}
          returnKeyType="done"
          onChangeText={this.state.handlefriendusernameChange}
          placeholder={"Friend's name"}
        />
        <Button label={"Add Friend"} onPress={this.state.AcceptFriendRequest} />
      </>
    );
  }
}
