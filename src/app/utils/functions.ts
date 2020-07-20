export const isInString = (names: string[], value: string) => (new RegExp(`${names.join('|')}`, 'i')).test(value);
