const convertEpoch = (value:any) => {
    if (!value) {
        return ''
    }
    const time = new Date(Number(value));
    if (isNaN(time.valueOf())) {
        return '';
    }
    return time.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
}

export default convertEpoch;