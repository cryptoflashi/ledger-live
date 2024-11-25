import React from "react";
import { canStake } from "@ledgerhq/live-common/families/near/logic";
import { NearAccount } from "@ledgerhq/live-common/families/near/types";

import { IconsLegacy } from "@ledgerhq/native-ui";
import { Trans } from "react-i18next";
import type { Account } from "@ledgerhq/types-live";
import { NavigatorName, ScreenName } from "~/const";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { ActionButtonEvent, NavigationParamsType } from "~/components/FabActions";
import { getStakeLabelLocaleBased } from "~/helpers/getStakeLabelLocaleBased";

const getMainActions = ({
  account,
  parentAccount,
  parentRoute,
}: {
  account: NearAccount;
  parentAccount: Account;
  parentRoute: RouteProp<ParamListBase, ScreenName>;
}): ActionButtonEvent[] => {
  const stakingDisabled = !canStake(account);
  const startWithValidator =
    account.nearResources && account.nearResources?.stakingPositions.length > 0;
  const label = getStakeLabelLocaleBased();

  const navigationParams: NavigationParamsType = stakingDisabled
    ? [
        NavigatorName.NoFundsFlow,
        {
          screen: ScreenName.NoFunds,
          params: {
            account,
            parentAccount,
          },
        },
      ]
    : [
        NavigatorName.NearStakingFlow,
        {
          screen: startWithValidator
            ? ScreenName.NearStakingValidator
            : ScreenName.NearStakingStarted,
          params: {
            source: parentRoute,
            skipStartedStep: startWithValidator,
          },
        },
      ];
  return [
    {
      id: "stake",
      navigationParams,
      label: <Trans i18nKey={label} />,
      Icon: IconsLegacy.CoinsMedium,
      eventProperties: {
        currency: "NEAR",
      },
    },
  ];
};

export default {
  getMainActions,
};
