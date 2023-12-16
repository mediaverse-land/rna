import { FC, createContext, useState } from 'react';

type Props = {
    children: React.ReactNode;
};

export const alertContext = createContext({
    open: function () {
        //
    },
    close: function () {
        //
    },
    isOpen: function () {
        //
    }
});

export const AlertContextProvider: FC<Props> = ({ children }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const openAlert = () => {
        setIsAlertOpen(true);
    };

    const closeAlert = () => {
        setIsAlertOpen(false);
    };

    const isAlertOpenHandler = () => isAlertOpen;

    const store: {
        open: () => void;
        close: () => void;
        isOpen: () => boolean;
    } = {
        open: openAlert,
        close: closeAlert,
        isOpen: isAlertOpenHandler
    };

    return (
        <alertContext.Provider value={store}>{children}</alertContext.Provider>
    );
};
