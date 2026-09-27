import {
  TextInput, Text, View, TouchableOpacity,
  Image, ScrollView, Keyboard
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import styles from './styles';
import { mostraMensagem, confirmar } from './util';

const MINIMO_FIGURAS = 6;

export default function TelaCadastro({ figuras, adicionarFigura, removerFigura }) {

  const [imagem, setImagem] = useState(null);
  const [descricao, setDescricao] = useState('');

  async function selecionaImagem() {
    try {
      let permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissao.granted) {
        mostraMensagem('Permissão negada', 'Permita o acesso à galeria para escolher uma imagem.');
        return;
      }

      let resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.3,   // imagem menor para caber no armazenamento local
        base64: true,
      });

      if (resultado.canceled) return;

      // A imagem é guardada em Base64 para continuar disponível
      // mesmo depois que o app for fechado.
      let asset = resultado.assets[0];
      if (asset.uri.startsWith('data:')) {
        setImagem(asset.uri);
      } else if (asset.base64) {
        setImagem(`data:${asset.mimeType || 'image/jpeg'};base64,${asset.base64}`);
      } else {
        setImagem(asset.uri);
      }
    }
    catch (e) {
      mostraMensagem('Erro ao selecionar imagem', e.toString());
    }
  }

  function validaCampos() {
    if (imagem == null) {
      mostraMensagem('Atenção', 'Selecione uma imagem para a figura.');
      return false;
    }
    if (descricao.trim().length == 0) {
      mostraMensagem('Atenção', 'Informe a descrição da figura.');
      return false;
    }
    return true;
  }

  async function salvaFigura() {
    if (!validaCampos()) return;

    let obj = {
      id: Date.now().toString(),
      imagem,
      descricao: descricao.trim()
    };

    try {
      await adicionarFigura(obj);
      limparCampos();
      mostraMensagem('Sucesso!', 'Figura cadastrada com sucesso!!!');
    }
    catch (e) {
      mostraMensagem('Erro ao salvar figura', e.toString());
    }
  }

  function limparCampos() {
    setImagem(null);
    setDescricao('');
    Keyboard.dismiss();
  }

  function excluiFigura(id) {
    confirmar('Atenção', 'Confirma a exclusão desta figura?', async () => {
      try {
        await removerFigura(id);
      }
      catch (e) {
        mostraMensagem('Erro ao excluir figura', e.toString());
      }
    });
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudoTela}>

      <Text style={styles.labelCampo}>Imagem</Text>
      <View style={[styles.areaImagem, styles.sombra]}>
        {imagem != null ? (
          <Image source={{ uri: imagem }} style={styles.imagemPreview} resizeMode="cover" />
        ) : (
          <Text style={styles.textoSemImagem}>Nenhuma imagem selecionada</Text>
        )}
      </View>

      <TouchableOpacity style={[styles.botaoGrande, styles.sombra]} onPress={() => selecionaImagem()}>
        <Text style={styles.textoBotao}>Selecionar Imagem</Text>
      </TouchableOpacity>

      <Text style={styles.labelCampo}>Descrição</Text>
      <TextInput style={[styles.campoEdicao, styles.sombra]}
        onChangeText={(texto) => setDescricao(texto)} value={descricao}
        placeholder="Ex.: Cachorro"
      />

      <View style={styles.areaBotao}>
        <TouchableOpacity style={[styles.botaoMetade, styles.sombra]} onPress={() => salvaFigura()}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botaoMetade, styles.sombra]} onPress={() => limparCampos()}>
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listaFiguras}>
        <Text style={styles.labelCampo}>Figuras Cadastradas ({figuras.length})</Text>

        {figuras.length < MINIMO_FIGURAS && (
          <Text style={styles.textoAviso}>
            Cadastre pelo menos {MINIMO_FIGURAS} figuras para poder jogar.
          </Text>
        )}

        {figuras.map((figura) => (
          <View style={styles.itemFigura} key={figura.id}>
            <Image source={{ uri: figura.imagem }} style={styles.imagemLista} resizeMode="cover" />
            <Text style={styles.descricaoLista}>{figura.descricao}</Text>
            <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluiFigura(figura.id)}>
              <Text style={styles.textoBotaoPequeno}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}
