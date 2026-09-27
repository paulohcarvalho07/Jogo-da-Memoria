import { Alert, Platform } from 'react-native';

// No navegador o Alert do React Native não exibe nada,
// então usamos o alert/confirm do próprio navegador.
export function mostraMensagem(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n\n${mensagem}`);
  } else {
    Alert.alert(titulo, mensagem);
  }
}

export function confirmar(titulo, mensagem, aoConfirmar) {
  if (Platform.OS === 'web') {
    if (window.confirm(`${titulo}\n\n${mensagem}`)) aoConfirmar();
    return;
  }
  Alert.alert(titulo, mensagem, [
    { text: 'Sim', onPress: aoConfirmar },
    { text: 'Não', style: 'cancel' }
  ]);
}

// Embaralhamento de Fisher-Yates (não altera o vetor original)
export function embaralhar(vetor) {
  let copia = [...vetor];
  for (let i = copia.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// 75 -> "01:15"
export function formataTempo(totalSegundos) {
  let minutos = Math.floor(totalSegundos / 60);
  let segundos = totalSegundos % 60;
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

// Date -> "dd/mm/aaaa"
export function formataData(data) {
  let dia = String(data.getDate()).padStart(2, '0');
  let mes = String(data.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${data.getFullYear()}`;
}

// Quanto menos erros e menos tempo, maior a pontuação (mínimo 0)
export function calculaPontuacao(erros, segundos) {
  return Math.max(0, 1000 - erros * 20 - segundos * 2);
}
