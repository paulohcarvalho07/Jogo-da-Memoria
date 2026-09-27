import { StyleSheet, StatusBar } from "react-native";

const COR_TITULO = '#2e1cd4';
const COR_BOTAO = '#110f61';
const COR_CAMPO = '#7cd1eb';
const COR_SUCESSO = '#0ddb90';
const COR_ERRO = '#d42e2e';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: StatusBar.currentHeight || 40,
    },
    areaTitulo: {
        width: '95%',
        height: 60,
        backgroundColor: COR_TITULO,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17,
        alignSelf: 'center'
    },
    titulo: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },
    sombra: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,
        elevation: 23,
    },

    // ===== Menu de navegação entre as telas =====
    areaMenu: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    botaoMenu: {
        width: '31%',
        height: 50,
        backgroundColor: COR_BOTAO,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoMenuAtivo: {
        backgroundColor: COR_SUCESSO,
    },
    textoMenuAtivo: {
        color: '#000',
    },

    // ===== Estrutura comum das telas =====
    tela: {
        flex: 1,
        width: '100%',
    },
    conteudoTela: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    labelCampo: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
    },
    campoEdicao: {
        backgroundColor: COR_CAMPO,
        width: '80%',
        height: 40,
        fontSize: 17,
        fontWeight: 'bold',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    areaBotao: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    botaoMetade: {
        width: '45%',
        height: 60,
        backgroundColor: COR_BOTAO,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoGrande: {
        width: '60%',
        height: 55,
        backgroundColor: COR_BOTAO,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    textoBotao: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textoAviso: {
        fontSize: 16,
        color: COR_ERRO,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },

    // ===== Tela de Cadastro =====
    areaImagem: {
        width: 160,
        height: 160,
        backgroundColor: COR_CAMPO,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    imagemPreview: {
        width: '100%',
        height: '100%',
    },
    textoSemImagem: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        padding: 10,
    },
    listaFiguras: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#E0E0E0'
    },
    itemFigura: {
        backgroundColor: COR_SUCESSO,
        flexDirection: 'row',
        width: '90%',
        minHeight: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    imagemLista: {
        width: 64,
        height: 64,
        borderRadius: 6,
    },
    descricaoLista: {
        flex: 1,
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
        marginHorizontal: 12,
    },
    botaoExcluir: {
        backgroundColor: COR_ERRO,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 14,
    },
    textoBotaoPequeno: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },

    // ===== Tela do Jogo =====
    areaInfo: {
        width: '90%',
        backgroundColor: COR_CAMPO,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    textoInfo: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginVertical: 3,
    },
    areaPlacar: {
        width: 336,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 10,
    },
    placarItem: {
        width: '31%',
        backgroundColor: COR_CAMPO,
        borderRadius: 10,
        paddingVertical: 8,
        alignItems: 'center',
    },
    placarLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    placarValor: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COR_BOTAO,
    },
    placarErros: {
        color: COR_ERRO,
    },
    tabuleiro: {
        width: 336,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    cartaContainer: {
        width: 100,
        height: 100,
        margin: 6,
    },
    carta: {
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    cartaFechada: {
        backgroundColor: COR_BOTAO,
    },
    cartaAberta: {
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: COR_CAMPO,
    },
    cartaEncontrada: {
        borderWidth: 4,
        borderColor: COR_SUCESSO,
    },
    imagemCarta: {
        width: '100%',
        height: '100%',
    },
    textoCartaFechada: {
        fontSize: 44,
        fontWeight: 'bold',
        color: '#FFF',
    },
    areaResultado: {
        width: '90%',
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: COR_SUCESSO,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 15,
    },
    textoParabens: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0a8f5b',
        textAlign: 'center',
        marginBottom: 10,
    },
    textoResultado: {
        fontSize: 18,
        color: '#000',
        marginVertical: 3,
    },
    textoPontuacao: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COR_TITULO,
        marginVertical: 8,
    },

    // ===== Tela de Ranking =====
    tabela: {
        width: '95%',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    linhaCabecalho: {
        flexDirection: 'row',
        backgroundColor: COR_TITULO,
        paddingVertical: 12,
    },
    linhaTabela: {
        flexDirection: 'row',
        paddingVertical: 12,
        alignItems: 'center',
    },
    linhaPar: {
        backgroundColor: COR_CAMPO,
    },
    linhaImpar: {
        backgroundColor: '#e8f7fc',
    },
    textoCabecalho: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textoCelula: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    colPosicao: {
        flex: 1.3,
    },
    colJogador: {
        flex: 2.5,
    },
    colPontuacao: {
        flex: 2,
    },
    colData: {
        flex: 2.2,
    },
    textoFormula: {
        fontSize: 13,
        color: '#555',
        textAlign: 'center',
        marginTop: 15,
    },
});

export default styles;
