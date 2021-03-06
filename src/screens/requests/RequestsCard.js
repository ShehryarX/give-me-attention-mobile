import React from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { COLOURS } from "../../config/colors";
import { RequestsCardStore } from "./RequestsCardStore";
import { ProfileController } from "../../controllers/ProfileController";

export class RequestsCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = new RequestsCardStore(props);
  }

  async componentDidMount() {
    const url = await ProfileController.getProfilePictureURL(this.props.username);
    this.setState({
      profilePictureURL: url
    })
  }

  render() {
    let positionStyles = null;
    return (
      <View style={[styles.container]}>
        <View style={styles.leftSide}>
          <Image source={{uri: this.state.profilePictureURL}} style={styles.image} />
          <Text style={[styles.name, styles.text]}>{this.props.username}</Text>
        </View>
        <View style={styles.rightSide}>
          <TouchableOpacity
            style={styles.btn}
            onPress={this.props.onConfirm}
          >
            <Text style={styles.btnText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPres={this.props.onIgnore}
          >
            <Text style={styles.btnText}>Ignore</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.WHITE,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 7.5,
    padding: 15,
    justifyContent: 'space-between',
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 1 },
    elevation: 5
  },
  text: {
    fontSize: 18,
    lineHeight: 48,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: COLOURS.DODGER_BLUE
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: 48,
    width: 48,
    marginRight: 20,
    borderRadius: 24
  },
  rightSide: {
    flexDirection: 'row'
  },
  btn: {
    paddingHorizontal: 10,
  },
  btnText: {
    lineHeight: 48
  }
});