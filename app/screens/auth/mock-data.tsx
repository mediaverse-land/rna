import { ICON_APPLE, ICON_FACEBOOK, ICON_GOOGLE } from "../../constaints/icons";

export
    const providerButtons = [
        {
            id: 1,
            icon: <ICON_APPLE
                width={13.28}
                height={15.8}
            />,
            backgroundColor: "#000000",
            textColor: '#fff',
            text: 'Sign up with Apple'
        },
        {
            id: 2,
            icon: <ICON_GOOGLE
                width={12.86}
                height={15.8}
            />,
            backgroundColor: "#fff",
            textColor: '#000000',
            text: 'Sign up with Google'
        },
        {
            id: 3,
            icon: <ICON_FACEBOOK
                width={16}
                height={16}
            />,
            backgroundColor: "#1771E6",
            textColor: '#fff',
            text: 'Sign up with Facebook'
        },
    ]