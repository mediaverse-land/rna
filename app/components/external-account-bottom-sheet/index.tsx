import React, { FC, ReactNode, memo, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Box } from "../box";
import { theme } from "../../constaints/theme";
import { Text } from "../text";
import { Button } from "../button";
import { LoadingSpinner } from "../loader-spinner";
import { useGetExternalAccountsListQuery } from "../../services/auth.service";
import { ICONS_GOOGLE_BLUE } from "../../constaints/icons";
import { UseNavigationType } from "../../types/use-navigation";
import { ExternalAccount as IExternalAccount } from "../../types/external-account";
import { ACCOUNTS_SCREEN } from "../../constaints/consts";
import { RadioButton } from "../form";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  setSelectedAccount: (account: IExternalAccount, time: string) => void;
  token: string;
  headerElement?: ReactNode;
};

const ExternalAccount: FC<Props> = ({
  setSelectedAccount,
  token,
  headerElement,
}) => {
  const [page, setPage] = useState(1);
  const [__dataList, setDataList] = useState<IExternalAccount[]>([]);
  const [shareTime, setShareTime] = useState("now");

  const [date, setDate] = useState<Date>(null);
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const { data, isFetching, isLoading, refetch } =
    useGetExternalAccountsListQuery({
      token,
      page,
    });

  const isFocuses = useIsFocused();
  const navigation = useNavigation<UseNavigationType>();

  useEffect(() => {
    if (isFocuses) {
      refetch();
    }
    if (!isFocuses) {
      setDataList(null);
      setPage(1);
    }
  }, [isFocuses]);

  useEffect(() => {
    if (!isFocuses) {
      return;
    }

    if (data?.data) {
      setDataList((prev) => [...prev, ...data?.data]);
    }
  }, [data?.data]);

  const setNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const createAccountHandler = () => {
    navigation.navigate(ACCOUNTS_SCREEN);
  };

  const navigateToSharedAccountsScreen = () => {
    navigation.navigate(ACCOUNTS_SCREEN);
  };

  const totalRecords = data?.total;
  const shouldLoadMore = totalRecords > __dataList?.length;

  const renderItem = ({ item }: { item: IExternalAccount }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setSelectedAccount(item, selectedDate)}
      >
        <Box
          width={"100%"}
          backgroundColor="#4E4E61"
          height={56}
          marginBottom={16}
          borderRadius={16}
          paddingRight={16}
          paddingLeft={16}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <ICONS_GOOGLE_BLUE />
          <Text color={theme.color.light.WHITE} fontSize={14} fontWeight={600}>
            {item.title}
          </Text>
        </Box>
      </TouchableOpacity>
    );
  };

  const _key = (item: IExternalAccount) => item.id.toString();

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);

    if (!currentDate) {
      return;
    }

    const year = currentDate.getFullYear() || 0;
    const month = currentDate.getMonth() + 1 || 0;
    const day = currentDate.getDate();
    const hours = currentDate.getHours() || 0;
    const minutes = currentDate.getMinutes() || 0;
    const seconds = currentDate.getSeconds() || 0;

    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    setSelectedDate(formattedTime);
  };

  const _year = date?.getFullYear() || "";
  const _month = date?.getMonth() + 1 || "";
  const _day = date?.getDate() || "";
  const _hours = date?.getHours() || "";
  const _minutes = date?.getMinutes() || "";

  const __selectedDate = `${_year}-${_month}-${_day}`;
  const __selectedTime = `${_hours}:${_minutes}`;

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const setSelectedShareTime = (item: string | any) => {
    if (item === "now") {
      setSelectedDate(null);
    }
    setShareTime(item);
  };

  return (
    <>
      <BottomSheetFlatList
        data={__dataList}
        keyExtractor={_key}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            {headerElement ? headerElement : null}
            <Box width="100%" marginTop={-8} marginBottom={24}>
              <Box marginTop={16}>
                <RadioButton
                  labelText="When to share asset?"
                  dataList={["now", "later"]}
                  defaultOption={"now"}
                  getSelectedOption={setSelectedShareTime}
                />
                {shareTime === "later" ? (
                  <>
                    <Button
                      varient="dark"
                      onpressHandler={showDatepicker}
                      text={`${_year ? __selectedDate : "Choose date"}`}
                      borderRadius={8}
                      marginTop={8}
                    />
                    <Button
                      varient="dark"
                      onpressHandler={showTimepicker}
                      text={`${_hours ? __selectedTime : "Choose time"}`}
                      borderRadius={8}
                      marginTop={8}
                    />
                  </>
                ) : null}
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date || new Date()}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                    minimumDate={new Date()}
                  />
                )}

                {/* {selectedShareTime } */}
              </Box>
            </Box>
            <Box
              width="100%"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              marginBottom={32}
            >
              <Text
                color={theme.color.light.WHITE}
                fontSize={16}
                fontWeight={600}
              >
                Select an account to continue
              </Text>
              <TouchableOpacity
                onPress={navigateToSharedAccountsScreen}
                activeOpacity={1}
              >
                <Text
                  color={theme.color.light.TEXT}
                  fontSize={14}
                  fontWeight={400}
                >
                  Manage accounts
                </Text>
              </TouchableOpacity>
            </Box>
          </>
        }
        ListFooterComponent={
          <>
            {isFetching || isLoading ? (
              <LoadingSpinner />
            ) : !__dataList?.length ? (
              <Box>
                <Button
                  onpressHandler={createAccountHandler}
                  varient="dark"
                  text="No accounts yet? create one"
                  borderRadius={16}
                />
              </Box>
            ) : (
              <Box marginTop={16}>
                {shouldLoadMore ? (
                  <Button
                    onpressHandler={setNextPage}
                    varient="dark"
                    text="Load more"
                    size="lg"
                    borderRadius={16}
                  />
                ) : null}
              </Box>
            )}
          </>
        }
        contentContainerStyle={{
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
          paddingBottom: 650,
        }}
      />
    </>
  );
};

export default memo(ExternalAccount);
