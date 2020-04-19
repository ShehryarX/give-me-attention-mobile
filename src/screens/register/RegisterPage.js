import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Button } from "../../common/Button";
import { FormTextInput } from "../../common/FormTextInput";
import { COLOURS } from "../../config/colors";
import { observer } from "mobx-react";
import { RegisterStore } from "./state";
import Ionicons from "react-native-ionicons";
import { UserStore } from "../../stores/UserStore";

@observer
export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = new RegisterStore(props);
  }

  render() {
    if(UserStore.isUserSignedIn) this.props.navigation.navigate('Home');
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Register.</Text>
          <TouchableOpacity
            style={styles.avatar}
            onPress={this.state.handlePickAvatar}
          >
            <Image
              source={{ uri: this.state.avatar }}
              style={styles.avatarPlaceholder}
            />
            <Ionicons
              name="ios-add"
              size={40}
              color="#FFF"
              style={{ marginTop: 10 }}
            ></Ionicons>
          </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={styles.gotoLogin}>Already have an account? Click here to login.</Text>
          </TouchableOpacity>
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
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E1E2E6",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  gotoLogin: {
    color: COLOURS.DODGER_BLUE_LIGHTER,
    marginVertical: 20,
    textAlign: 'center'
  }
});
