import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Button } from "../../common/Button";
import { FormTextInput } from "../../common/FormTextInput";
import { COLOURS } from "../../config/colors";
import { observer } from "mobx-react";
import { RegisterStore } from "./state";

@observer
export class RegisterPage extends React.Component {
  state = new RegisterStore();

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Register.</Text>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.state.handleEmailChange}
            returnKeyType="done"
            label={"Email"}
          />
          <FormTextInput
            value={this.state.username}
            onChangeText={this.state.handleUsernameChange}
            returnKeyType="done"
            label={"Username"}
          />
          <FormTextInput
            value={this.state.password}
            secureTextEntry={true}
            returnKeyType="done"
            onChangeText={this.state.handlePasswordChange}
            label={"Password"}
          />
          <View style={styles.actionButton}>
            <Button
              label={"Register"}
              onPress={this.state.handleCreateUserAccount}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: COLOURS.DODGER_BLUE,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
  },
  heading: {
    color: COLOURS.WHITE,
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 15,
  },
  actionButton: {
    marginTop: 40,
  },
});
