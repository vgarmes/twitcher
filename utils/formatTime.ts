const doubleDigits = (time: string) => {
  return time.length === 1 ? '0' + time : time;
};

const formatTime = (time: string) => {
  const splitTime = time.slice(0, time.length - 1).split(/[\h\m]/g);

  switch (splitTime.length) {
    case 1:
      return `0:${splitTime[0]}`;
    case 2:
      return `${splitTime[0]}:${doubleDigits(splitTime[1])}`;
    case 3:
      return `${splitTime[0]}:${doubleDigits(splitTime[1])}:${doubleDigits(
        splitTime[2]
      )}`;
    default:
      return time;
  }
};

export default formatTime;
