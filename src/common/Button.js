import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLOURS } from "../config/colors";

export class Button extends React.Component {
  render() {
    const { label, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOURS.DODGER_BLUE,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.7)",
  },
  text: {
    color: COLOURS.WHITE,
    textAlign: "center",
    height: 20,
  },
});
