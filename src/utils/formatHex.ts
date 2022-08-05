export const format = (value: any) => {
  let hex = Number(value).toString(16);

  if (hex.length < 2) {
    hex = `0${hex}`;
  }

  return hex;
};
