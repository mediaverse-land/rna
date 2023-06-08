export const formatTime = (secs: number) => {
    secs = Math.round(secs);

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    const obj = {
        minute: minutes,
        second: seconds
    };
    return obj;
};
