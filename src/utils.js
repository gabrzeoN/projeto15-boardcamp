export function compareDate(initialDate, endDate){
    const timeMilliseconds = endDate - initialDate;
    const timeSeconds = timeMilliseconds / 1000;
    const timeHours = timeSeconds / 3600;
    const timeDays = timeHours / 24;
    return Math.trunc(timeDays);
}