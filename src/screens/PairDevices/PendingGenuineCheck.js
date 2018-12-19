// @flow

import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Trans } from "react-i18next";

import colors from "../../colors";
import { TrackScreen } from "../../analytics";
import getWindowDimensions from "../../logic/getWindowDimensions";
import DeviceNanoAction from "../../components/DeviceNanoAction";
import LText from "../../components/LText";

const { width } = getWindowDimensions();

class PendingGenuineCheck extends PureComponent<*> {
  render() {
    return (
      <View style={styles.root}>
        <TrackScreen category="PairDevices" name="PendingGenuineCheck" />
        <View style={styles.nano}>
          <DeviceNanoAction action screen="validation" width={width} />
        </View>
        <LText secondary semiBold style={styles.title}>
          <Trans i18nKey="PairDevices.GenuineCheck.title" />
        </LText>
        <LText style={styles.subtitle}>
          <Trans i18nKey="PairDevices.GenuineCheck.accept">
            {"text"}
            <LText bold>bold text</LText>
          </Trans>
        </LText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginTop: 32,
    fontSize: 18,
    color: colors.darkBlue,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 16,
    textAlign: "center",
    paddingHorizontal: 24,
    lineHeight: 21,
    color: colors.smoke,
  },
  nano: {
    paddingLeft: "33%",
  },
});

export default PendingGenuineCheck;
