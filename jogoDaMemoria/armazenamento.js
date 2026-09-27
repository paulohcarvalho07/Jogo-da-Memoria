import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves usadas no armazenamento local do dispositivo
const CHAVE_FIGURAS = '@figuras';
const CHAVE_RANKING = '@ranking';

const TAMANHO_RANKING = 5;

async function carregaLista(chave) {
  let objString = await AsyncStorage.getItem(chave);
  if (objString == null) return [];

  let lista = JSON.parse(objString);
  return Array.isArray(lista) ? lista : [];
}

export async function carregaFiguras() {
  return carregaLista(CHAVE_FIGURAS);
}

export async function salvaFiguras(lista) {
  await AsyncStorage.setItem(CHAVE_FIGURAS, JSON.stringify(lista));
}

export async function carregaRanking() {
  return carregaLista(CHAVE_RANKING);
}

// Inclui o recorde, ordena do melhor para o pior e guarda só os 5 melhores.
// Retorna true se o recorde entrou no Top 5.
export async function salvaRecorde(recorde) {
  let ranking = await carregaRanking();
  ranking.push(recorde);

  // Maior pontuação primeiro; em caso de empate, quem terminou em menos tempo
  ranking.sort((a, b) => b.pontuacao - a.pontuacao || a.tempo - b.tempo);
  ranking = ranking.slice(0, TAMANHO_RANKING);

  await AsyncStorage.setItem(CHAVE_RANKING, JSON.stringify(ranking));
  return ranking.some((r) => r.id == recorde.id);
}
