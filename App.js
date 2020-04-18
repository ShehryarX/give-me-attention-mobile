import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react";
import { RegisterPage } from "./src/screens/register/RegisterPage";
import UserStore from "./src/stores/UserStore";
import "./src/config/FirebaseConfig";
import { HomePage } from "./src/screens/home/HomePage";

@observer
class App extends React.Component {
  render() {
    const { isUserSignedIn } = UserStore;

    return (
      <View style={styles.container}>
        {isUserSignedIn ? <HomePage /> : <RegisterPage />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
