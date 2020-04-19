import React from "react";
import { Text, StyleSheet, View, ScrollView, Dimensions, Image } from "react-native";
import { Button } from "../../common/Button";
import { FormTextInput } from "../../common/FormTextInput";
import { LeaderboardStore } from "./state";
import { UserStore } from "../../stores/UserStore";
import { COLOURS } from "../../config/colors";
import { LeaderboardCard } from "./LeaderboardCard";

export class LeaderboardPage extends React.Component {
  state = new LeaderboardStore();
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
        <View style={styles.banner}>
          <Text style={styles.needAttention}>top attention givers!</Text>
          <View style={styles.topThree}>
            {
              this.state.people[1] ?
              <Image source={{
                uri: this.state.people[1].profilePicture
              }} style={[styles.dp, styles.dpSecondPlace]}/>
              : null 
            }
            {
              this.state.people[0] ?
              <Image source={{
                uri: this.state.people[0].profilePicture
              }} style={[styles.dp, styles.dpLarge, styles.dpFirstPlace]}/>
              : null
            }
            {
              this.state.people[2] ?
              <Image source={{
                uri: this.state.people[2].profilePicture
              }} style={[styles.dp, styles.dpThirdPlace]}/>
              : null
            }
          </View>
        </View>
        <View style={styles.leaderboard}>
          {
            this.state.people.map((person, i) => {
              return (
                <LeaderboardCard 
                  profilePicture={person.profilePicture}
                  username={person.username}
                  score={person.score}
                  rank={i}
                  style={styles.leaderboardEntry}
                />
              );
            })
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
    backgroundColor: COLOURS.LIGHT_SILVER,
  },
  containerContent: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  banner: {
    borderBottomLeftRadius: Dimensions.get('window').width * 2,
    borderBottomRightRadius: Dimensions.get('window').width * 2,
    backgroundColor: COLOURS.DODGER_BLUE,
    width: "170%",
    alignItems: "center",
    height: Dimensions.get('window').height * 0.425
  },
  needAttention: {
    color: COLOURS.WHITE,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 36,
    letterSpacing: 2,
    marginTop: 80
  },
  topThree: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30
  },
  dp: {
    width: Dimensions.get('window').width * 0.225,
    height: Dimensions.get('window').width * 0.225,
    borderRadius: Dimensions.get('window').width * 0.225,
    margin: 10,
    borderWidth: 5
  },
  dpLarge: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    borderRadius: Dimensions.get('window').width * 0.15
  },
  dpFirstPlace: {
    borderColor: COLOURS.GOLDEN
  },
  dpSecondPlace: {
    borderColor: COLOURS.PURPLE
  },
  dpThirdPlace: {
    borderColor: COLOURS.CYAN
  },
  leaderboard: {
    width: '100%',
    marginVertical: 20
  },
  leaderboardEntry: {
    width: '90%'
  }
});