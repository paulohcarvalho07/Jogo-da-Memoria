import {
  TextInput, Text, View, TouchableOpacity, ScrollView, Keyboard
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import styles from './styles';
import Carta from './Carta';
import { salvaRecorde } from './armazenamento';
import {
  embaralhar, formataTempo, formataData, calculaPontuacao, mostraMensagem
} from './util';

const QTD_PARES = 6;             // 6 figuras -> 6 pares -> 12 cartas
const TEMPO_MOSTRA_ERRO = 1200;  // tempo (ms) que as cartas erradas ficam visíveis

export default function TelaJogo({ figuras }) {

  const [cartas, setCartas] = useState([]);           // as 12 cartas embaralhadas
  const [abertas, setAbertas] = useState([]);         // índices das cartas viradas na jogada
  const [encontradas, setEncontradas] = useState([]); // ids das figuras cujo par já foi achado
  const [erros, setErros] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);  // impede cliques enquanto o erro é mostrado
  const [emAndamento, setEmAndamento] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [segundos, setSegundos] = useState(0);
  const [idPartida, setIdPartida] = useState(0);
  const [nomeJogador, setNomeJogador] = useState('');
  const [recordeSalvo, setRecordeSalvo] = useState(false);

  const inicioRef = useRef(null);
  const intervaloRef = useRef(null);
  const timeoutRef = useRef(null);

  // Ao sair da tela, para o cronômetro e qualquer temporizador pendente
  useEffect(() => {
    return () => {
      paraCronometro();
      clearTimeout(timeoutRef.current);
    };
  }, []);

  function iniciaCronometro() {
    paraCronometro();
    inicioRef.current = Date.now();
    setSegundos(0);
    intervaloRef.current = setInterval(() => {
      setSegundos(Math.floor((Date.now() - inicioRef.current) / 1000));
    }, 250);
  }

  function paraCronometro() {
    if (intervaloRef.current != null) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
  }

  function iniciarPartida() {
    if (figuras.length < QTD_PARES) {
      mostraMensagem('Atenção', `Cadastre pelo menos ${QTD_PARES} figuras para jogar.`);
      return;
    }

    // 1. Seleciona aleatoriamente 6 figuras cadastradas
    let sorteadas = embaralhar(figuras).slice(0, QTD_PARES);

    // 2. Duplica cada figura, formando 6 pares
    let pares = [];
    sorteadas.forEach((figura) => {
      let carta = { figuraId: figura.id, imagem: figura.imagem, descricao: figura.descricao };
      pares.push({ ...carta });
      pares.push({ ...carta });
    });

    // 3. Distribui os pares aleatoriamente nas 12 posições
    clearTimeout(timeoutRef.current);
    setCartas(embaralhar(pares));
    setAbertas([]);
    setEncontradas([]);
    setErros(0);
    setBloqueado(false);
    setFinalizado(false);
    setNomeJogador('');
    setRecordeSalvo(false);
    setIdPartida(idPartida + 1);
    setEmAndamento(true);
    iniciaCronometro();
  }

  function virarCarta(indice) {
    if (bloqueado || finalizado) return;
    if (abertas.includes(indice)) return;
    if (encontradas.includes(cartas[indice].figuraId)) return;

    let novasAbertas = [...abertas, indice];
    setAbertas(novasAbertas);

    // Ainda falta virar a segunda carta da jogada
    if (novasAbertas.length < 2) return;

    let [primeira, segunda] = novasAbertas;

    if (cartas[primeira].figuraId == cartas[segunda].figuraId) {
      // Acertou: o par fica visível e não pode mais ser selecionado
      let novasEncontradas = [...encontradas, cartas[primeira].figuraId];
      setEncontradas(novasEncontradas);
      setAbertas([]);

      if (novasEncontradas.length == QTD_PARES) {
        finalizaPartida();
      }
    } else {
      // Errou: conta o erro e fecha as duas cartas depois de um tempo
      setErros(erros + 1);
      setBloqueado(true);
      timeoutRef.current = setTimeout(() => {
        setAbertas([]);
        setBloqueado(false);
      }, TEMPO_MOSTRA_ERRO);
    }
  }

  function finalizaPartida() {
    paraCronometro();
    setSegundos(Math.floor((Date.now() - inicioRef.current) / 1000));
    setFinalizado(true);
  }

  const pontuacao = calculaPontuacao(erros, segundos);

  async function salvarNoRanking() {
    if (nomeJogador.trim().length == 0) {
      mostraMensagem('Atenção', 'Informe o nome do jogador.');
      return;
    }

    let recorde = {
      id: Date.now().toString(),
      jogador: nomeJogador.trim(),
      pontuacao,
      erros,
      tempo: segundos,
      data: formataData(new Date())
    };

    try {
      let entrouNoTop = await salvaRecorde(recorde);
      setRecordeSalvo(true);
      Keyboard.dismiss();
      mostraMensagem('Ranking', entrouNoTop
        ? 'Recorde salvo no ranking!!!'
        : 'Sua pontuação não entrou no Top 5 desta vez.');
    }
    catch (e) {
      mostraMensagem('Erro ao salvar recorde', e.toString());
    }
  }

  if (!emAndamento) {
    return (
      <ScrollView style={styles.tela} contentContainerStyle={styles.conteudoTela}>
        <View style={[styles.areaInfo, styles.sombra]}>
          <Text style={styles.textoInfo}>Figuras cadastradas: {figuras.length}</Text>
          <Text style={styles.textoInfo}>
            Serão sorteadas {QTD_PARES} figuras, formando {QTD_PARES} pares em {QTD_PARES * 2} cartas.
          </Text>
          {figuras.length < QTD_PARES && (
            <Text style={styles.textoAviso}>
              Cadastre pelo menos {QTD_PARES} figuras na tela de Cadastro para jogar.
            </Text>
          )}
        </View>

        <TouchableOpacity style={[styles.botaoGrande, styles.sombra]} onPress={() => iniciarPartida()}>
          <Text style={styles.textoBotao}>Iniciar Partida</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudoTela}>

      {/* Contador de erros, cronômetro e pares encontrados */}
      <View style={styles.areaPlacar}>
        <View style={[styles.placarItem, styles.sombra]}>
          <Text style={styles.placarLabel}>Erros</Text>
          <Text style={[styles.placarValor, styles.placarErros]}>{erros}</Text>
        </View>
        <View style={[styles.placarItem, styles.sombra]}>
          <Text style={styles.placarLabel}>Tempo</Text>
          <Text style={styles.placarValor}>{formataTempo(segundos)}</Text>
        </View>
        <View style={[styles.placarItem, styles.sombra]}>
          <Text style={styles.placarLabel}>Pares</Text>
          <Text style={styles.placarValor}>{encontradas.length}/{QTD_PARES}</Text>
        </View>
      </View>

      {/* Grade com as 12 cartas */}
      <View style={styles.tabuleiro}>
        {cartas.map((carta, indice) => (
          <Carta
            key={`${idPartida}-${indice}`}
            indice={indice}
            figura={carta}
            aberta={abertas.includes(indice) || encontradas.includes(carta.figuraId)}
            encontrada={encontradas.includes(carta.figuraId)}
            onPress={() => virarCarta(indice)}
          />
        ))}
      </View>

      {/* Resultado final */}
      {finalizado ? (
        <View style={[styles.areaResultado, styles.sombra]}>
          <Text style={styles.textoParabens}>Parabéns! Você encontrou todos os pares!</Text>
          <Text style={styles.textoResultado}>Total de erros: {erros}</Text>
          <Text style={styles.textoResultado}>Tempo total: {formataTempo(segundos)}</Text>
          <Text style={styles.textoPontuacao}>Pontuação: {pontuacao}</Text>

          {!recordeSalvo ? (
            <>
              <TextInput style={[styles.campoEdicao, styles.sombra]}
                onChangeText={(texto) => setNomeJogador(texto)} value={nomeJogador}
                placeholder="Nome do jogador"
              />
              <TouchableOpacity style={[styles.botaoGrande, styles.sombra]} onPress={() => salvarNoRanking()}>
                <Text style={styles.textoBotao}>Salvar no Ranking</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.textoResultado}>Resultado enviado ao ranking.</Text>
          )}

          <TouchableOpacity style={[styles.botaoGrande, styles.sombra]} onPress={() => iniciarPartida()}>
            <Text style={styles.textoBotao}>Nova Partida</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={[styles.botaoGrande, styles.sombra]} onPress={() => iniciarPartida()}>
          <Text style={styles.textoBotao}>Reiniciar Partida</Text>
        </TouchableOpacity>
      )}

    </ScrollView>
  );
}
