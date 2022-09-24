import { ImageBackground, ImageSourcePropType, TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '../../theme';

import { styles } from './styles';

export interface GamesCardProps {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  }
}

interface Props extends TouchableOpacityProps {
  data: GamesCardProps;
}

export function GameCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.cover}
        source={{ uri: data.bannerUrl }}
      >

        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name} >{data.title}</Text>
          <Text style={styles.ads} >{data._count.ads} anúncio(s)</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}