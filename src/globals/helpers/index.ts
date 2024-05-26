export const buildDateString = (date: Date) => {
  const constructedDate = new Date(date);

  const month = ('0' + constructedDate.getMonth()).slice(-2);
  const day = ('0' + constructedDate.getDate()).slice(-2);

  return `${constructedDate.getFullYear()}-${month}-${day}`;
};

export const buildTimeString = (time: Date) => {
  const constructedTime = new Date(time);

  const hours = ('0' + constructedTime.getHours()).slice(-2);
  const minutes = ('0' + constructedTime.getMinutes()).slice(-2);

  return `${hours}:${minutes}`;
};
