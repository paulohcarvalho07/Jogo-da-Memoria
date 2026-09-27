import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useState, useEffect } from 'react';

import TelaCadastro from './TelaCadastro';
import TelaJogo from './TelaJogo';
import TelaRanking from './TelaRanking';
import { carregaFiguras, salvaFiguras } from './armazenamento';
import { mostraMensagem } from './util';

export default function App() {

  // Tela exibida no momento: 'cadastro', 'jogo' ou 'ranking'
  const [tela, setTela] = useState('cadastro');

  // Figuras cadastradas (usadas pela tela de cadastro e pela tela do jogo)
  const [figuras, setFiguras] = useState([]);

  useEffect(() => {
    carregaDados();
  }, []);

  async function carregaDados() {
    try {
      setFiguras(await carregaFiguras());
    }
    catch (e) {
      mostraMensagem('Erro ao carregar figuras', e.toString());
      setFiguras([]);
    }
  }

  async function adicionarFigura(figura) {
    let novaLista = [...figuras, figura];
    await salvaFiguras(novaLista);
    setFiguras(novaLista);
  }

  async function removerFigura(id) {
    let novaLista = figuras.filter((f) => f.id != id);
    await salvaFiguras(novaLista);
    setFiguras(novaLista);
  }

  function botaoMenu(nome, rotulo) {
    let ativo = tela == nome;
    return (
      <TouchableOpacity
        style={[styles.botaoMenu, styles.sombra, ativo && styles.botaoMenuAtivo]}
        onPress={() => setTela(nome)}>
        <Text style={[styles.textoBotao, ativo && styles.textoMenuAtivo]}>{rotulo}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.areaTitulo}>
        <Text style={styles.titulo}>Jogo da Memória</Text>
      </View>

      <View style={styles.areaMenu}>
        {botaoMenu('cadastro', 'Cadastro')}
        {botaoMenu('jogo', 'Jogo')}
        {botaoMenu('ranking', 'Ranking')}
      </View>

      {tela == 'cadastro' && (
        <TelaCadastro
          figuras={figuras}
          adicionarFigura={adicionarFigura}
          removerFigura={removerFigura}
        />
      )}
      {tela == 'jogo' && <TelaJogo figuras={figuras} />}
      {tela == 'ranking' && <TelaRanking />}

      <StatusBar style="auto" />
    </View>
  );
}
