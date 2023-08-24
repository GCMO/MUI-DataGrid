export const generateDateTime = (): number => {
  const year = Math.floor(2020 + Math.random() * 3); //?
  const month = Math.floor(Math.random() * 12); //?
  const day = Math.floor(Math.random() * 29); //?
  const hour = Math.floor(Math.random() * 24); //?
  const minute = Math.floor(Math.random() * 60); //?
  const second = Math.floor(Math.random() * 60); //?
  const ms = Math.floor(Math.random() * 1000); //?

  return Date.UTC(year, month, day, hour, minute, second, ms);
};
