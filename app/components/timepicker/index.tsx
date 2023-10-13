import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input } from "../form";
import { Button } from "../button";

export const TimePicker = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<any>("time");
  const [show, setShow] = useState(true);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    console.log(currentDate)
    setShow(false);
    setDate(currentDate);
  };

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

  return (
    <>
      <Button varient="dark" text="Publish date" />
      {/* {show ? ( */}
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date(2023, 7, 10)}
          // minimumDate={new Date()}
        />
      {/* ) : null} */}
    </>
  );
};
