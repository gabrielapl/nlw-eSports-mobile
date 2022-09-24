import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from "@expo/vector-icons"

import logoImg from "../../assets/logo-nlw-esports.png"
import { Background } from '../../components/Background';

import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../@types/navigation';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from "../../components/DuoMatch";

export function Game() {

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>("");

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.100.41:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then(data => setDiscordDuoSelected(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.100.41:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then(data => setDuos(data))
  }, []);

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false} >
        <SafeAreaView style={styles.container}>

          <View style={styles.header} >
            <TouchableOpacity
              onPress={handleGoBack}
            >
              <Entypo
                name="chevron-thin-left"
                color={THEME.COLORS.CAPTION_300}
                size={20}
              />
            </TouchableOpacity>

            <Image
              source={logoImg}
              style={styles.logo}
            />

            <View style={styles.right} />
          </View>

          <Image
            source={{ uri: game.bannerUrl }}
            style={styles.cover}
            resizeMode="cover"
          />

          <Heading
            title={game.title}
            subtitle='Conecte-se e comece a jogar!'
          />


          <FlatList
            data={duos}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.containerList}
            contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText} >
                Não hà anucions publicados ainda.
              </Text>
            )}
            renderItem={({ item }) => <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />}
          />

          <DuoMatch 
            visible={discordDuoSelected.length > 0}
            discord={discordDuoSelected}
            onCloseModal={() => setDiscordDuoSelected("")}
          />
        </SafeAreaView>
      </ScrollView>
    </Background>
  );
}