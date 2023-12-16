export type UseNavigationType = {
    navigate?: (
        screenName: string,
        navigationOptions?: Record<string, string | number | boolean>
    ) => void;
    replace?: (
        screenName: string,
        navigationOptions?: Record<string, string | number | boolean>
    ) => void;
    setParams: (...args: any) => void;
    goBack?: () => void;
};
