export const isPsalm = (songNumber: number | string | null) => {
    return (typeof (songNumber) === "number" && songNumber <= 300);
};