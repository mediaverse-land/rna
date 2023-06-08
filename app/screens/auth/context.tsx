// /* eslint-disable @typescript-eslint/no-empty-function */
// import { createContext, useState } from 'react';

// type Props = {
//     children: React.ReactNode;
// };

// export const authContext = createContext({
//     open: function () { },
//     close: function () { },
//     isOpen: function () { }
// });

// export const AlertContextProvider: React.FC<Props> = ({ children }) => {
//     const [phoneNum, setPhoneNum] = useState<string>(false);
//     const [otpCode, setOtpCode] = useState<string>()
//     const [time, setTime] = useState<string | number>(null);

//     const setPhoneNumberHandler = (number: string) => {
//         setPhoneNum(number)
//     }

//     const setOtpCodeHandler = (otp: string) => {
//         setOtpCode(otp);
//     }

//     const setTimeHandler = (tm: string | number) => {
//         setTime(tm)
//     }

//     const getPhoneNumber = () => phoneNum;
//     const getOtpCode = () => otpCode;
//     const getTime = () => time;

//     const openAlert = () => {
//         // setIsAlertOpen(true);
//     };

//     const closeAlert = () => {
//         // setIsAlertOpen(false);
//     };

//     const isAlertOpenHandler = () => {
//         // return isAlertOpen;
//     }

//     const store: {
//         open: () => void;
//         close: () => void;
//         isOpen: () => boolean;
//     } = {
//         open: openAlert,
//         close: closeAlert,
//         isOpen: isAlertOpenHandler
//     };

//     return (
//         <authContext.Provider value={store}>{children}</authContext.Provider>
//     );
// };
