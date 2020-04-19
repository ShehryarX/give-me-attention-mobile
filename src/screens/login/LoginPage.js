import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Button } from "../../common/Button";
import { FormTextInput } from "../../common/FormTextInput";
import { COLOURS } from "../../config/colors";
import { observer } from "mobx-react";
import { LoginStore } from "./state";
import { UserStore } from "../../stores/UserStore";

@observer
export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = new LoginStore(props);
  }

  render() {
    //if(UserStore.isUserSignedIn) this.props.navigation.navigate('Home');
    return (
      <View
        style={styles.container}
      >
        <View style={styles.form}>
          <Text style={styles.heading}>Login.</Text>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.state.handleEmailChange}
            returnKeyType="done"
            label={"Email"}
          />
          <FormTextInput
            value={this.state.password}
            secureTextEntry={true}
            returnKeyType="done"
            onChangeText={this.state.handlePasswordChange}
            label={"Password"}
          />
          <View style={styles.actionButton}>
            <Button label={"Login"} onPress={this.state.handleLoginPress} />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register')}
          >
            <Text style={styles.gotoRegister}>Need an account? Click here to register.</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.DODGER_BLUE,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
  },
  actionButton: {
    marginTop: 40,
  },
  heading: {
    color: COLOURS.WHITE,
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 15,
  },
  gotoRegister: {
    color: COLOURS.DODGER_BLUE_LIGHTER,
    marginVertical: 20,
    textAlign: 'center'
  }
});
