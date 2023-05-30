export type UseNavigationType = {
    navigate?: (
        screenName: string,
        navigationOptions?: Record<string, any>
    ) => void;
    goBack?: () => void;
};
