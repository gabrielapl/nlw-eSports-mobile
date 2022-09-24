import { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from "expo-clipboard"
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import { Loading } from '../Loading';

interface Props extends ModalProps { 
  discord: string;
  onCloseModal: () => void;
}

export function DuoMatch({ discord, onCloseModal, ...rest }: Props) {

  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true)
    await Clipboard.setStringAsync(discord);
    Alert.alert("Discord Copiado!", "Usuário copiado para color no Discord.");

    setIsCopping(false);
  }

  return (
    <Modal
      animationType='fade'
      transparent
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>

          <TouchableOpacity
            style={styles.closeIcon}
            onPress={onCloseModal}
          >
            <MaterialIcons 
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
              weight="bold"
            />
          </TouchableOpacity>

          <CheckCircle 
            size={64}
            color={THEME.COLORS.SUCCESS}
          />

          <Heading 
            title="Let’s play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: "center", marginTop: 20 }}
          />

          <Text style={styles.label}>Adicione no Discord</Text>
          <TouchableOpacity 
            style={styles.discordButton} 
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopping}
          >
            { isCopping ? <Loading /> : <Text style={styles.discord}>{discord}</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}