import { Animated, TouchableOpacity, Image, Text, Platform } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import styles from './styles';

// O driver nativo de animação não existe no navegador
const usaDriverNativo = Platform.OS !== 'web';
const DURACAO_VIRADA = 150; // metade da virada (fecha e depois abre)

export default function Carta({ figura, aberta, encontrada, indice, onPress }) {

  const escalaX = useRef(new Animated.Value(1)).current; // animação de virar/esconder
  const entrada = useRef(new Animated.Value(0)).current; // animação de exibir no início

  const [mostraFrente, setMostraFrente] = useState(aberta);
  const abertaRef = useRef(aberta);
  const primeiraVez = useRef(true);

  // Exibir: as cartas aparecem uma a uma quando a partida começa
  useEffect(() => {
    Animated.timing(entrada, {
      toValue: 1,
      duration: 300,
      delay: indice * 60,
      useNativeDriver: usaDriverNativo,
    }).start();
  }, []);

  // Virar / esconder: a carta "encolhe" até sumir, troca o lado e "cresce" de novo
  useEffect(() => {
    abertaRef.current = aberta;
    if (primeiraVez.current) {
      primeiraVez.current = false;
      return;
    }

    Animated.timing(escalaX, {
      toValue: 0,
      duration: DURACAO_VIRADA,
      useNativeDriver: usaDriverNativo,
    }).start(() => {
      setMostraFrente(abertaRef.current);
      Animated.timing(escalaX, {
        toValue: 1,
        duration: DURACAO_VIRADA,
        useNativeDriver: usaDriverNativo,
      }).start();
    });
  }, [aberta]);

  return (
    <Animated.View
      style={[
        styles.cartaContainer,
        { opacity: entrada, transform: [{ scale: entrada }, { scaleX: escalaX }] }
      ]}>
      <TouchableOpacity
        style={[
          styles.carta,
          mostraFrente ? styles.cartaAberta : styles.cartaFechada,
          encontrada && styles.cartaEncontrada
        ]}
        onPress={onPress}
        disabled={aberta}
        activeOpacity={0.8}>
        {mostraFrente ? (
          <Image source={{ uri: figura.imagem }} style={styles.imagemCarta} resizeMode="cover" />
        ) : (
          <Text style={styles.textoCartaFechada}>?</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
