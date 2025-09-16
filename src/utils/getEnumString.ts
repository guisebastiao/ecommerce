export const getEnumValue = <T extends Record<string, string>>(enumObj: T, key: keyof T): string => {
  return enumObj[key];
};
