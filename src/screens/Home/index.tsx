import { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from "../../assets/logo-nlw-esports.png"
import { Background } from '../../components/Background';
import { GameCard, GamesCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {

  const navigation = useNavigation();

  const [games, setGames] = useState<GamesCardProps[]>([]);

  function handleOpenGame({ id, title, bannerUrl }: GamesCardProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  useEffect(() => {
    fetch("http://192.168.100.41:3333/games")
      .then((response) => response.json())
      .then(data => setGames(data))
  }, []);

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false} >

        <SafeAreaView style={styles.container}>
          <Image
            source={logoImg}
            style={styles.logo}
          />

          <Heading
            title='Encontre seu duo!'
            subtitle='Selecione o game que deseja jogar...'
          />

          <FlatList
            data={games}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
            renderItem={({ item }) => <GameCard data={item} onPress={() => handleOpenGame(item)} />}
          />
          
        </SafeAreaView>

      </ScrollView>
    </Background>
  );
}