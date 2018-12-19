/* @flow */
/* eslint-disable no-console */
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import type { NavigationScreenProp } from "react-navigation";
import { translate, Trans } from "react-i18next";
import firmwareUpdateMain from "@ledgerhq/live-common/lib/hw/firmwareUpdate-main";
import type {
  FinalFirmware,
  OsuFirmware,
} from "@ledgerhq/live-common/lib/types/manager";
import { TrackScreen } from "../../analytics";
import colors from "../../colors";
import DeviceNanoAction from "../../components/DeviceNanoAction";
import StepHeader from "../../components/StepHeader";
import { BulletItem } from "../../components/BulletList";
import getWindowDimensions from "../../logic/getWindowDimensions";
import Installing from "../../components/Installing";

type Navigation = NavigationScreenProp<{
  params: {
    deviceId: string,
    osu: ?OsuFirmware,
    final: ?FinalFirmware,
  },
}>;

type Props = {
  navigation: Navigation,
};

type State = {
  installing: ?string,
  progress: number,
};

class FirmwareUpdateMCU extends Component<Props, State> {
  static navigationOptions = {
    headerLeft: null,
    headerTitle: (
      <StepHeader
        subtitle={<Trans i18nKey="FirmwareUpdate.title" />}
        title={<Trans i18nKey="FirmwareUpdateMCU.title" />}
      />
    ),
  };

  state = {
    installing: null,
    progress: 0,
  };

  sub: *;

  async componentDidMount() {
    const { navigation } = this.props;
    const deviceId = navigation.getParam("deviceId");
    const final = navigation.getParam("final");

    this.sub = firmwareUpdateMain(deviceId, final).subscribe({
      next: patch => {
        this.setState(patch);
      },
      complete: () => {
        if (navigation.replace) {
          navigation.replace("FirmwareUpdateConfirmation", {
            ...navigation.state.params,
          });
        }
      },
      error: error => {
        if (navigation.replace) {
          navigation.replace("FirmwareUpdateFailure", {
            ...navigation.state.params,
            error,
          });
        }
      },
    });
  }

  componentWillUnmount() {
    if (this.sub) this.sub.unsubscribe();
  }

  render() {
    const { installing, progress } = this.state;
    const { width } = getWindowDimensions();

    return (
      <SafeAreaView style={styles.root}>
        <TrackScreen category="FirmwareUpdate" name="MCU" />
        {installing ? (
          <Installing progress={progress} installing={installing} />
        ) : (
          <View style={styles.body}>
            <View style={styles.step}>
              <BulletItem
                index={0}
                value={<Trans i18nKey="FirmwareUpdateMCU.desc1" />}
              />
              <View style={styles.device}>
                <DeviceNanoAction width={1.2 * width} />
              </View>
            </View>

            <View style={styles.step}>
              <BulletItem
                index={1}
                value={<Trans i18nKey="FirmwareUpdateMCU.desc2" />}
              />
              <View style={styles.device}>
                <DeviceNanoAction powerAction width={1.2 * width} />
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    padding: 20,
    flex: 1,
  },
  step: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  device: {
    left: "10%",
    position: "relative",
  },
  description: {
    color: colors.smoke,
    fontSize: 14,
    marginVertical: 30,
  },
});

export default translate()(FirmwareUpdateMCU);
