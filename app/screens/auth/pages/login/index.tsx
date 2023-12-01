import { useState, ReactNode, useMemo } from "react";
import { PaddingContainer } from "../../../../styles/grid";
import { Box } from "../../../../components/box";
import { windowSize } from "../../../../utils/window-size";
import {
  AuthWindows,
  INSERT_PHONE,
  LoginNavigationEvent,
  LoginWindows,
} from "../types";
import { InsertPhone } from "./insert-phone";
import { UserPass } from "./user-pass";
import { EmailPass } from "./email-pass";

type Props = {
  setWindowHandler: (window: AuthWindows) => void;
};

const { height } = windowSize();

export function Login({ setWindowHandler }: Props) {

  const [currentWindow, setCurrentWindow] =
    useState<LoginWindows>(INSERT_PHONE);

  const loginNavigationEventsHandler = useMemo<LoginNavigationEvent>(() => {
    return {
      navigateToEmailLogin: () => {
        setCurrentWindow("EMAIL_PASS");
      },
      navigateToUsernameLogin: () => {
        setCurrentWindow("USER_PASS");
      },
      navigateToPhoneLogin: () => {
        setCurrentWindow("INSERT_PHONE");
      },
    };
  }, []);

  const windows: Record<LoginWindows, ReactNode> = useMemo(() => {
    return {
      INSERT_PHONE: (
        <InsertPhone
          setWindowHandler={setWindowHandler}
          loginNavigationEventsHandler={loginNavigationEventsHandler}
        />
      ),
      EMAIL_PASS: (
        <EmailPass
          loginNavigationEventsHandler={loginNavigationEventsHandler}
        />
      ),
      USER_PASS: (
        <UserPass loginNavigationEventsHandler={loginNavigationEventsHandler} />
      ),
    };
  }, []);

  return (
    <PaddingContainer>
      <Box height={Math.floor(height) - 132}>{windows[currentWindow]}</Box>
    </PaddingContainer>
  );
}
