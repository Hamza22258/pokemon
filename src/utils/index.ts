export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const formatHeight = (height: number) => height * 10 + ' cm';

export const formatWeight = (weight: number) => weight / 10 + ' kg';
