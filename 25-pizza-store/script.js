let cart = []; 
let modalQt = 1;
let modalKey = 0;

const queryS = (element) => document.querySelector(element);
const querySAll = (element) => document.querySelectorAll(element);

// Listagem das pizzas
pizzaJson.map((item, index) => {
    // clonar a estrutura do pizza-item
    let pizzaItem = queryS('.models .pizza-item').cloneNode(true);

    // settar um atributo para identificar a pizza escolhida
    pizzaItem.setAttribute('data-key', index);

    // inserir a imagem no HTML
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    // extrair as informações dos itens e inserir no campo correto do HTML
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    // formatar o preço para que possua o "R$" e duas casas decimais
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    // configurar o link para abertura da tela de compra
    pizzaItem.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();
        modalQt = 1;

        let key = event.target.closest('.pizza-item').getAttribute('data-key');
        modalKey = key;

        // inserir os dados na tela de compra
        queryS('.pizzaBig img').src = pizzaJson[key].img;
        queryS('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        queryS('.pizzaInfo .pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        queryS('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        // retirar a seleção de tamanho anterior
        queryS('.pizzaInfo--size.selected').classList.remove('selected');

        // percorrer o array de sizes e para cada elemento salvar no respectivo campo
        querySAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected');
            };
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })
        
        // settar a quantidade de produtos inicial
        queryS('.pizzaInfo--qt').innerHTML = modalQt;

        // tornar a tela gradualmente visível
        queryS('.pizzaWindowArea').style.opacity = 0;
        queryS('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            queryS('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    })

    // inserir o item na área do HTML
    queryS('.pizza-area').append(pizzaItem);
});


// Eventos do Modal
function closeModal() {
    queryS('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        queryS('.pizzaWindowArea').style.display = 'none';
    }, 200);
};

// atribuição do evento de clique para os botões desktop e mobile para fechar o modal
querySAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

// botão de subtrair mais uma unidade
queryS('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        queryS('.pizzaInfo--qt').innerHTML = modalQt;
    }
});

// botão de adicionar mais uma unidade
queryS('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    queryS('.pizzaInfo--qt').innerHTML = modalQt;
});

// botões de tamanho
querySAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (event) => {
        queryS('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

queryS('.pizzaInfo--addButton').addEventListener('click', () => {
    
    // qual a pizza? modalKey
    // quantas pizzas? modalQt
    // qual o tamanho?
    let size = parseInt(queryS('.pizzaInfo--size.selected').getAttribute('data-key'));

    // adicionar ao cart

    // identificador de qual pizza e tamanho, para percorrer o 
    // array do cart e verificar se já há esse elemento.
    // Se já houver, apenas acrescenta a quantidade adicional de unidades
    // e torna a variável "repeated" true, de forma a não adicionar mais
    // nenhuma informação, não executando o código "if"
    let identifier = pizzaJson[modalKey].id + '@' + size;
    let repeated = false;

    for (let i in cart) {
        if (cart[i].identifier == identifier) {
            cart[i].qt += modalQt;
            repeated = true;
        }
    }

    if (repeated == false) {
        cart.push({
            identifier: identifier,
            id: pizzaJson[modalKey].id,
            size: size,
            qt: modalQt
        });
    }
    
    // atualizar o cart
    updateCart();

    // fechar o modal
    closeModal();
});

queryS('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        queryS('aside').style.left = '0';
    }
});

queryS('.menu-closer').addEventListener('click', () => {
    queryS('aside').style.left = '100vw';
});


function updateCart() {
    // atualizar o número de itens no cart na versão mobile
    queryS('.menu-openner span').innerHTML = cart.length;

    // exibir o aside caso haja algum item no cart
    if (cart.length > 0) {
        queryS('aside').classList.add('show');
        // zerar o cart para que não duplique os itens
        queryS('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => {
                return item.id == cart[i].id;
            });
            subtotal += pizzaItem.price * cart[i].qt;

            let cartItem = queryS('.models .cart--item').cloneNode(true);
            
            let pizzaSizeName = cart[i].size;
            
            switch (pizzaSizeName) {
                case (0):
                    pizzaSizeName = "P";
                    break;
                case (1):
                    pizzaSizeName = "M";
                    break;
                case(2):
                    pizzaSizeName = "G";
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                    
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });

            queryS('.cart').append(cartItem);
        }
    
        desconto = subtotal / 10;
        total = subtotal - desconto;

        queryS('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        queryS('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        queryS('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;


    } else {
        queryS('aside').classList.remove('show');
        queryS('.aside').style.left = '100vw';
    }
};