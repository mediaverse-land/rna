/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { Box } from "../box";
import { screenSize } from "../../utils/screen-size";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "../text";
import { theme } from "../../constaints/theme";
import { ICON_ARROW_DOWN_SVG } from "../../constaints/icons";
import { useClickOutside } from "react-native-click-outside";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { daysInMonth, getDayName } from "../../utils/format-date";

const { width } = screenSize();

const date = new Date();

const MemoCalendar = ({
  setActiveDay,
}: {
  setActiveDay: (item: { month: string; day: number; year: number }) => void;
}) => {
  const [activeMonth, setActiveMonth] = useState<string>(null);
  const [activeYear, setActiveYear] = useState<number>(null);

  const [selectedDay, setSelectedDay] = useState<{
    month: string;
    day: number;
  }>(null);

  const [selectMonthDropDownOpen, setSelectMonthDropDownOpen] = useState(false);
  const [selectYearnDropDownOpen, setSelectYearDropDownOpen] = useState(false);

  const [daysOfMonth, setDaysOfMonth] = useState<any>(null);
  const [daysFakeArray, setDaysFakeArray] = useState<any>(null);
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<any>(null);

  useEffect(() => {
    setActiveDay({ ...selectedDay, year: activeYear });
  }, [selectedDay, activeYear]);

  useEffect(() => {
    if (months[date.getMonth()]) {
      setActiveMonth(months[date.getMonth()]);
      setActiveYear(date.getFullYear());
    }
  }, []);

  useEffect(() => {
    if (!activeMonth) {
      return;
    }
    __addDaysOfMonthHandler();
  }, [activeMonth, activeYear]);

  function __addDaysOfMonthHandler() {
    const __daysOfMonth = daysInMonth(activeYear, monthIndex[activeMonth]);
    setDaysOfMonth(__daysOfMonth);
  }

  useEffect(() => {
    if (!daysOfMonth || daysOfMonth === undefined) {
      return;
    }

    let _daysFakeArray: any;

    const formattedStringDate = `${activeYear}-${monthIndex[activeMonth]}-03`;

    const newDate = new Date(formattedStringDate);

    newDate.setDate(1);

    const _firstDayOfMonth = getDayName(newDate);

    setFirstDayOfMonth(_firstDayOfMonth);

    // eslint-disable-next-line prefer-const
    _daysFakeArray = Array(daysOfMonth).fill("");

    if (_firstDayOfMonth?.includes("Tu")) {
      const fake: any = [null];
      _daysFakeArray.unshift(...fake);
    }
    if (_firstDayOfMonth.includes("Wed")) {
      const fake: any = [null, null];
      _daysFakeArray.unshift(...fake);
    }
    if (_firstDayOfMonth?.includes("Th")) {
      const fake: any = [null, null, null];
      _daysFakeArray.unshift(...fake);
    }
    if (_firstDayOfMonth.includes("Fr")) {
      const fake: any = [null, null, null, null];
      _daysFakeArray.unshift(...fake);
    }
    if (_firstDayOfMonth?.includes("Sa")) {
      const fake: any = [null, null, null, null, null];
      _daysFakeArray.unshift(...fake);
    }
    if (_firstDayOfMonth?.includes("Su")) {
      const fake: any = [null, null, null, null, null, null];
      _daysFakeArray.unshift(...fake);
    }
    setDaysFakeArray(_daysFakeArray);
  }, [daysOfMonth]);

  const openSelectMonthDropdown = () => setSelectMonthDropDownOpen(true);
  const closeSelectMonthDropdown = () => setSelectMonthDropDownOpen(false);

  const selectMonthHandler = (_month: string) => {
    setActiveMonth(_month);
    closeSelectMonthDropdown();
  };

  const openYearDropdownHandler = () => {
    setSelectYearDropDownOpen(true);
  };

  const setSelectedYearHandler = (year: number) => {
    // setActiveYear
    setActiveYear(year);
    closeSelectYearDropdown();
  };

  const closeSelectYearDropdown = () => {
    setSelectYearDropDownOpen(false);
  };

  if (!daysFakeArray || !activeMonth || !firstDayOfMonth) {
    return null;
  }
  return (
    <Box width={width - 48}>
      {/* header */}
      <Box
        width={width - 48}
        id="header"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box id="month" width="36%" position="relative">
          <TouchableOpacity
            onPress={openSelectMonthDropdown}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              color={theme.color.light.CARD_TITLE_TEXT}
              fontSize={16}
              fontWeight={600}
            >
              {activeMonth}
            </Text>
            <Box>
              <ICON_ARROW_DOWN_SVG height={16} />
            </Box>
          </TouchableOpacity>
        </Box>
        <Box id="Year" width="36%">
          <TouchableOpacity
            onPress={openYearDropdownHandler}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              color={theme.color.light.CARD_TITLE_TEXT}
              fontSize={16}
              fontWeight={600}
            >
              {activeYear}
            </Text>
            <Box>
              <ICON_ARROW_DOWN_SVG height={16} />
            </Box>
          </TouchableOpacity>
        </Box>
        {selectMonthDropDownOpen ? (
          <MonthDropdown
            closerHandler={closeSelectMonthDropdown}
            selectMonthHandler={selectMonthHandler}
          />
        ) : null}
        {selectYearnDropDownOpen ? (
          <YearDropdown
            currentYear={activeYear}
            closerHandler={closeSelectYearDropdown}
            setSelectedYearHandler={setSelectedYearHandler}
          />
        ) : null}
      </Box>

      {/* Days */}
      <Box id="days">
        <Box
          marginTop={32}
          width={width - 15}
          position="relative"
          left={-16}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {days.map((item, index: number) => {
            return (
              <Box
                key={index}
                width="14%"
                justifyContent="center"
                alignItems="center"
              >
                <Text color={theme.color.light.TEXT}>{item}</Text>
              </Box>
            );
          })}
        </Box>

        <Box
          id="days-cells"
          width={width - 15}
          position="relative"
          left={-16}
          direction="row"
          flex={1}
          marginTop={24}
          flexWrap="wrap"
          justifyContent="flex-start"
          alignItems="center"
        >
          {Array.isArray(daysFakeArray) &&
            daysFakeArray?.length &&
            daysFakeArray.map((item, index: number) => {
              let dayIndex: number = index + 1;

              if (firstDayOfMonth.includes("Tu")) {
                dayIndex = index;
              }
              if (firstDayOfMonth.includes("Wed")) {
                dayIndex = index - 1;
              }
              if (firstDayOfMonth.includes("Th")) {
                dayIndex = index - 2;
              }
              if (firstDayOfMonth.includes("Fr")) {
                dayIndex = index - 3;
              }
              if (firstDayOfMonth.includes("Sa")) {
                dayIndex = index - 4;
              }
              if (firstDayOfMonth.includes("Su")) {
                dayIndex = index - 5;
              }

              if (item === null) {
                return <Box key={item.id} width={"14.2%"}></Box>;
              }

              return (
                <TouchableOpacity
                key={item.id}
                  onPress={() =>
                    setSelectedDay({ day: dayIndex, month: activeMonth })
                  }
                  style={[
                    {
                      // width: '10%',
                      minWidth: "14.2%",
                      marginBottom: 21,
                      alignItems: "center",
                      position: "relative",
                      height: 28,
                    }
                  ]}
                  activeOpacity={1}
                >
                  <Text
                    fontSize={16}
                    fontWeight={600}
                    // @ts-ignore
                    textStyles={
                      selectedDay?.day === dayIndex &&
                      selectedDay?.month === activeMonth
                        ? selectedDayStyles
                        : {
                            color: theme.color.light.TEXT,
                            borderRadius: 100,
                          }
                    }
                  >
                    {dayIndex}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export const Calendar = MemoCalendar;

const YearDropdown = ({
  closerHandler,
  setSelectedYearHandler,
}: {
  closerHandler: () => void;
  currentYear: number;
  setSelectedYearHandler: (year: number) => void;
}) => {
  const _modalWrapperRef = useClickOutside<View>(() => {
    closerHandler();
  });

  const years = [2023, 2024, 2025];

  return (
    <View
      ref={_modalWrapperRef}
      style={{
        position: "absolute",
        width: 124,
        height: 140,
        zIndex: 100000000,
        right: 16,
        top: 28,
      }}
    >
      <LinearGradient {..._menuWindowGradientProps}>
        <BlurView
          style={{ width: "100%", height: "100%", borderRadius: 16 }}
          tint="dark"
          intensity={90}
        >
          <ScrollView style={{ flex: 1 }}>
            <Box width="100%" padding={16} height="100%">
              {years.map((year, index: number) => {
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedYearHandler(year)}
                    key={index}
                    activeOpacity={1}
                  >
                    <Text
                      color="#D9D9FF"
                      marginBottom={16}
                      fontSize={14}
                      fontWeight={600}
                    >
                      {year}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </Box>
          </ScrollView>
        </BlurView>
      </LinearGradient>
    </View>
  );
};

const MonthDropdown = ({
  closerHandler,
  selectMonthHandler,
}: {
  closerHandler: () => void;
  selectMonthHandler: (item: string) => void;
}) => {
  const modalWrapperRef = useClickOutside<View>(() => {
    closerHandler();
  });

  if (!modalWrapperRef) {
    return null;
  }

  return (
    <View
      ref={modalWrapperRef}
      style={{
        position: "absolute",
        width: 124,
        height: 445,
        zIndex: 100000000,
        // right: 16,
        top: 28,
      }}
    >
      <LinearGradient {...menuWindowGradientProps}>
        <BlurView
          style={{ width: "100%", height: "100%", flex: 1, borderRadius: 16 }}
          tint="dark"
          intensity={90}
        >
          <ScrollView style={{ flex: 1 }}>
            <Box width="100%" padding={16} flex={1}>
              {months.map((month) => {
                return (
                  <TouchableOpacity
                    onPress={() => selectMonthHandler(month)}
                    key={month}
                    activeOpacity={1}
                  >
                    <Text
                      color="#D9D9FF"
                      marginBottom={16}
                      fontSize={14}
                      fontWeight={600}
                    >
                      {month}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </Box>
          </ScrollView>
        </BlurView>
      </LinearGradient>
    </View>
  );
};

const selectedDayStyles = {
  width: 40,
  height: 40,
  backgroundColor: "#597AFF",
  position: "absolute",
  borderRadius: 100,
  textAlign: "center",
  top: -10,
  paddingTop: 10,
  color: theme.color.light.WHITE,
};

const menuWindowGradientProps = {
  style: {
    width: 127,
    height: 300,
    borderRadius: 16,
    padding: 1,
    opacity: 0.5,
    flex: 1,
  },
  colors: ["#4b4b55", "#38383c"],
  start: {
    x: 0.1,
    y: 0.7,
  },
};

const _menuWindowGradientProps = {
  ...menuWindowGradientProps,
  style: {
    ...menuWindowGradientProps.style,
    height: 140,
  },
};

const days = ["Mo", "Tu", "We", "Th", "Fr", "sa", "su"];

const monthIndex: Record<string, number> = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
