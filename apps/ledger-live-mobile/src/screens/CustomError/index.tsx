import { Flex, Text } from "@ledgerhq/native-ui";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ErrorSvg from "./ErrorSvg";
import { StackNavigatorProps } from "~/components/RootNavigator/types/helpers";
import { CustomErrorNavigatorParamList } from "~/components/RootNavigator/types/CustomErrorNavigator";
import { ScreenName } from "~/const";
import { useTranslation } from "react-i18next";

type CustomErrorPropsProps = StackNavigatorProps<
  CustomErrorNavigatorParamList,
  ScreenName.CustomErrorScreen
>;

export default function CustomError({ route }: CustomErrorPropsProps) {
  const { t } = useTranslation();
  const error = route.params.error;

  return (
    <SafeAreaView style={styles.root}>
      <Flex justifyContent="center" alignItems="center" flex={1}>
        <ErrorSvg />
        <Text variant="h3Inter" fontWeight="bold" fontSize={25} textAlign={"center"}>
          {t("errors.CustomError.title")}
          {"\n"}
        </Text>
        <Text variant="body" textAlign={"center"}>
          {t("errors.CustomError.description")}
          {`Code: ${error?.cause.swapCode}`}
        </Text>
      </Flex>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 32,
  },
});
