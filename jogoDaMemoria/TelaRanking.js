import { Text, View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import { carregaRanking } from './armazenamento';
import { mostraMensagem } from './util';

export default function TelaRanking() {

  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    carregaDados();
  }, []);

  async function carregaDados() {
    try {
      setRanking(await carregaRanking());
    }
    catch (e) {
      mostraMensagem('Erro ao carregar ranking', e.toString());
      setRanking([]);
    }
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudoTela}>

      <Text style={styles.labelCampo}>Top 5 - Melhores Resultados</Text>

      {ranking.length == 0 ? (
        <Text style={styles.textoAviso}>Nenhum recorde registrado ainda. Jogue uma partida!</Text>
      ) : (
        <View style={[styles.tabela, styles.sombra]}>
          <View style={styles.linhaCabecalho}>
            <Text style={[styles.textoCabecalho, styles.colPosicao]}>Posição</Text>
            <Text style={[styles.textoCabecalho, styles.colJogador]}>Jogador</Text>
            <Text style={[styles.textoCabecalho, styles.colPontuacao]}>Pontuação</Text>
            <Text style={[styles.textoCabecalho, styles.colData]}>Data</Text>
          </View>

          {ranking.map((recorde, indice) => (
            <View
              key={recorde.id}
              style={[styles.linhaTabela, indice % 2 == 0 ? styles.linhaPar : styles.linhaImpar]}>
              <Text style={[styles.textoCelula, styles.colPosicao]}>{indice + 1}</Text>
              <Text style={[styles.textoCelula, styles.colJogador]}>{recorde.jogador}</Text>
              <Text style={[styles.textoCelula, styles.colPontuacao]}>{recorde.pontuacao}</Text>
              <Text style={[styles.textoCelula, styles.colData]}>{recorde.data}</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.textoFormula}>
        Pontuação = 1000 − (erros × 20) − (segundos × 2)
      </Text>

    </ScrollView>
  );
}
