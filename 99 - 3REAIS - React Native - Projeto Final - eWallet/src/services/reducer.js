import mock from './mock';
import Helper from './helper';

const inicial = {
    usuario: undefined,
    transacoes: [],
    pessoas: [],
    falha: false,
    id: 9,
    comprovar: false,
    primeira: true,
    inicio: '9',
    fim: '2020',
}

const reducer = (state = inicial, action) => {
    let transacoes = [...state.transacoes];
    let usuario = state.usuario;
    let novaTransacao = {};
    let date = new Date();
    let dataAtual = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    let novoSaldo;
    switch (action.type) {
        case 'login/Logar':
            // if (action.login === "(99) 99999-9999" && action.senha === "proway") {
            return {
                ...state,
                usuario: { ...mock.usuario },
                transacoes: mock.transacoes,
                pessoas: mock.pessoas,
            }
        // } else {
        //     return {
        //         ...state,
        //         falha: true,
        //     }
        // }
        case 'falha/Reset':
            return { ...state, falha: false, }
        case 'extrato/Filtrar':
            if (action.filtro === "Tudo")
                return { ...state, filtro: undefined, }
            if (action.filtro === "Anterior")
                action.filtro = date.getMonth();
            let filtro = transacoes.filter((transacao) => {
                if (transacao.data.split('/')[1] == action.filtro)
                    return true;
            });
            return {
                ...state,
                filtro: filtro,
            }
        case 'deposito/Depositar':
            novaTransacao = {
                id: (++state.id).toString(),
                tipo: 1,
                nome: "Deposito por boleto",
                origem: "",
                valor: Helper.retiraR$(action.valor),
                data: dataAtual
            }
            transacoes.unshift(novaTransacao);
            usuario.saldo = Helper.calculaBR(usuario.saldo, '+', Helper.retiraR$(action.valor));
            return {
                ...state,
                transacoes: transacoes,
                usuario: usuario,
                id: novaTransacao.id
            }
        case 'transferencia/Transferir':
            novoSaldo = Helper.calculaBR(usuario.saldo, '-', Helper.retiraR$(action.valor));
            if (novoSaldo.substr(0, 1) === '-')
                return { ...state, falha: true, }
            novaTransacao = {
                id: (++state.id).toString(),
                tipo: 4,
                nome: "Transferencia Enviada",
                origem: action.amigo,
                valor: Helper.retiraR$(action.valor),
                data: dataAtual
            }
            transacoes.unshift(novaTransacao);
            usuario.saldo = novoSaldo;
            return {
                ...state,
                transacoes: transacoes,
                usuario: usuario,
                id: novaTransacao.id,
                comprovar: true,
            }
        case 'boleto/Pagar':
            novoSaldo = Helper.calculaBR(usuario.saldo, '-', action.valor);
            if (novoSaldo.substr(0, 1) === '-')
                return { ...state, falha: true, }
            novaTransacao = {
                id: (++state.id).toString(),
                tipo: 2,
                nome: "Pagamento de Boletos",
                origem: action.nome,
                valor: action.valor,
                data: dataAtual
            }
            transacoes.unshift(novaTransacao);
            usuario.saldo = novoSaldo;
            return {
                ...state,
                transacoes: transacoes,
                usuario: usuario,
                id: novaTransacao.id,
                comprovar: true,
            }
        case 'comprovante/Reset':
            return { ...state, comprovar: false, }
        case 'onboarding/Finalizar':
            return { ...state, primeira: false, }
        case 'perfil/Deslogar':
            return { ...state, usuario: undefined, transacoes: [] }
        default:
            return state;
    }
}

export default reducer;