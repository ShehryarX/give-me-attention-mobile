import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../../common/Button";
import { FormTextInput } from "../../common/FormTextInput";
import { COLOURS } from "../../config/colors";
import { observer } from "mobx-react";
import { LoginStore } from "./state";

@observer
export class LoginPage extends React.Component {
  state = new LoginStore();

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.state.handleEmailChange}
            returnKeyType="done"
            placeholder={"Email"}
          />
          <FormTextInput
            value={this.state.password}
            secureTextEntry={true}
            returnKeyType="done"
            onChangeText={this.state.handlePasswordChange}
            placeholder={"Password"}
          />
          <Button label={"Login"} onPress={this.state.handleLoginPress} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.WHITE,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
  },
});
