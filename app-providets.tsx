import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { ClickOutsideProvider } from "react-native-click-outside";
import { AlertContextProvider } from "./app/context/alert";
import { TokenContextProvider } from "./app/context/token";
import { UserContextProvider } from "./app/context/user";
import store from "./app/store";

type Props = {
  children: ReactNode;
};

export const AppProviders: FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <ClickOutsideProvider>
        <TokenContextProvider>
          <UserContextProvider>
            <AlertContextProvider>{children}</AlertContextProvider>
          </UserContextProvider>
        </TokenContextProvider>
      </ClickOutsideProvider>
    </Provider>
  );
};
