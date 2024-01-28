var items = [];

/*
    Adicionar itens ao carrinho
*/
function cadastrarProduto() {
    var nomeProduto = document.querySelector('#nome_produto'); // Corrigindo o seletor
    var precoProduto = document.querySelector('#price'); // Corrigindo o seletor

    var busca = items.findIndex(buscando);

    function buscando(item) {
        return item.nome === nomeProduto.value;
    }

    if (busca === -1) {
        items.push({
            nome: nomeProduto.value,
            valor: parseFloat(precoProduto.value),
            quantidade: 1
        });
    } else {
        items[busca].quantidade += 1;
    }

    atualizarLista();
}

/*
    Limpar carrinho
*/
document.querySelector('.btn-limpar').addEventListener('click', () => {
    items = [];
    atualizarLista();
});

/*
    Diminuir quantidade de itens
*/
function diminuirQuantidade(index) {
    if (items[index].quantidade <= 1) {
        items.splice(index, 1);
    } else {
        items[index].quantidade -= 1;
    }
    atualizarLista();
}

/*
    Aumentar quantidade de itens
*/
function aumentarQuantidade(index) {
    items[index].quantidade += 1;
    atualizarLista();
}

/*
    Atualizar itens do carrinho
*/
function atualizarLista() {
    let listaProdutos = document.querySelector('#product-list'); // Corrigindo o seletor
    let soma = 0;

    listaProdutos.innerHTML = "";
    items.forEach(function (val, index) {
        let subtotal = val.valor * val.quantidade;
        soma += subtotal;

        listaProdutos.innerHTML += `
            <div class="lista-produto-single">
                <h3>${val.nome}</h3>
                <span class="btn-menos" onclick="diminuirQuantidade(${index});">-</span>
                <span class="quantidade-itens">${val.quantidade}</span>
                <span class="btn-mais" onclick="aumentarQuantidade(${index});">+</span>
                <h3 class="price-produto"><span>R$${subtotal.toFixed(2)}</span></h3>
            </div>
        `;
    });

    soma = soma.toFixed(2);
    let elementoSoma = document.querySelector('#valor-total'); // Corrigindo o seletor
    elementoSoma.innerHTML = `R$${soma}`;
}