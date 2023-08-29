import { getColors } from 'react-native-image-colors';

export const getImageColors = async (uri: string) => {

  const colors = await getColors(uri, {
    fallback: 'grey',
    cache: true,
    key: uri,
  });

  let primary, secondary;

  if (colors.platform === 'android') {
    primary = colors.dominant;
    secondary = colors.average;
  } else if (colors.platform === 'ios') {
    primary = colors.primary;
    secondary = colors.secondary;
  }

  return [primary, secondary];
};
