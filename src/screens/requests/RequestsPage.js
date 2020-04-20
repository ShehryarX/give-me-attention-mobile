import * as React from 'react';
import { ScrollView, View, StyleSheet, Dimensions, Text } from 'react-native';
import { RequestsStore } from './state';
import { UserStore } from '../../stores/UserStore';
import { COLOURS } from '../../config/colors';
import { RequestsCard } from './RequestsCard';

export class RequestsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = new RequestsStore(props);
  }

  render() {
    console.log('requests: ', UserStore.friendRequestsList);
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}
      >
        <View style={styles.banner}>
          <Text style={styles.bannerHeading}>Friend Requests</Text>
        </View>
        <View style={styles.requests}>
          {
            UserStore.friendRequestsList ?
              UserStore.friendRequestsList.map(username => {
                return ( 
                  <RequestsCard
                    username={username}
                    onConfirm={() => this.state.confirmFriend(username)}
                    onIgnore={() => this.state.ignoreFriend(username)}
                  />
                )
              })
            : null
          }
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
  requests: {
    width: '100%',
    marginTop: 20
  }
});