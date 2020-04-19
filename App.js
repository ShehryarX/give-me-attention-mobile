import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react";
import { RegisterPage } from "./src/screens/register/RegisterPage";
import { LoginPage } from "./src/screens/login/LoginPage";
import { UserStore } from "./src/stores/UserStore";
import "./src/config/FirebaseConfig";
import { HomePage } from "./src/screens/home/HomePage";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LeaderboardPage } from "./src/screens/leaderboard/LeaderboardPage";

@observer
class App extends React.Component {
  render() {
    const { isUserSignedIn } = UserStore;

    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Register" component={RegisterPage}/>
          <Stack.Screen name="Login" component={LoginPage}/>
          <Stack.Screen name="Home" component={HomePage}/>
          <Stack.Screen name="Leaderboard" component={LeaderboardPage}/>
        </Stack.Navigator>
      </NavigationContainer>
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
