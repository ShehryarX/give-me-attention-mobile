import * as React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text } from 'react-native';
import { AddFriendStore } from './state';
import { COLOURS } from "../../config/colors";
import { FormTextInput } from '../../common/FormTextInput';
import { Button } from '../../common/Button';
import { ContactCard } from '../../common/ContactCard';

export class AddFriendPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = new AddFriendStore(props);
  }
  
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}
      >
        <View style={styles.banner}>
          <Text style={styles.bannerHeading}>Add Friend</Text>
        </View>
        <View style={styles.form}>
          <FormTextInput
            value={this.state.friendUsername}
            onChangeText={this.state.handleFriendUsernameChange}
            returnKeyType="done"
            label={"Friend Username"}
          />
          <Button label="Add Friend" onPress={this.state.doAddFriend}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLOURS.DODGER_BLUE,
  },
  containerContent: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  banner: {
    height: 450,
    marginTop: -300,
    paddingTop: 300,
    borderBottomLeftRadius: Dimensions.get("window").width,
    borderBottomRightRadius: Dimensions.get("window").width,
    backgroundColor: COLOURS.WHITE,
    width: Dimensions.get('window').width * 1.75,
    alignItems: "center",
  },
  bannerHeading: {
    color: COLOURS.DODGER_BLUE,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 36,
    letterSpacing: 2,
    marginTop: 40,
  },
  form: {
    width: '80%',
    marginTop: 20
  }
});