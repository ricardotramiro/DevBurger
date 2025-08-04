const list = document.querySelector("ul"); // Lista do products.js
const buttonShowAll = document.querySelector(".show-all"); // ForEach --> mostrar tudo
const buttonShowDiscont = document.querySelector(".show-discont"); // Map --> para dar 10% de desconto
const buttonShowAmount = document.querySelector(".show-amount"); // Reduce --> soma os valores
const buttonOnlyVegans = document.querySelector(".only-vegans"); // Filter --> vai mostar só os lanches veganos

// serve para colocar o valor em formato real (0,00)
function formatCurrency(value) {
  const newValue = value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  return newValue
}

// serve para mostrar tudo
function showAll(productsArray) {
  let myLi = "";

  productsArray.forEach((product) => {
    myLi += `
    <li>
        <img src=${product.src}>
        <p>${product.name}</p>
        <p class="price">R$ ${formatCurrency(product.price)}</p>
      </li>
    `;
  });
  list.innerHTML = myLi;

  // Some com o reduce quando mostrar outros itens
  document.querySelector("#summary").innerHTML = "";
}

// server para da os 10% de desconto
function showDiscont() {
  const newPrices = menuOptions.map((product) => ({
    name: product.name,
    price: product.price * 0.9,
    vegan: product.vegan,
    src: product.src,
  }));
  // obs pesquisa e estudar sobre -> ... Spread Operator
  showAll(newPrices);

  // Some com o map também
  document.querySelector("#summary").innerHTML = "";
}

// somar todos os valores dos lanches
function showAmount() {
  list.innerHTML = "";

  const total = menuOptions.reduce((acumulador, item) => {
    return acumulador + item.price;
  }, 0);

  const discont = 0.1;
  const totalDiscont = total - total * discont;

  const totalVegans = menuOptions.reduce((acumulador, item) => {
    return item.vegan ? acumulador + item.price : acumulador;
  }, 0);

  const totalMeats = menuOptions.reduce((acumulador, item) => {
    return !item.vegan ? acumulador + item.price : acumulador;
  }, 0);

  const summary = document.querySelector("#summary");

  summary.innerHTML = `
  <li>
  <p>Valor total dos lanches <span style="color: #ffd100"> R$ ${formatCurrency(total)}</span></p>
  </li>
  <li>
   <p>Valor total dos lanches com 10% de desconto <span style="color: #ffd100"> R$ ${totalDiscont}</span></p>
  </li>
  <li>
<p>Valor total lanches Veganos <span style="color: #ffd100"> R$ ${totalVegans}</span></p>
  </li>
  <li>
<p>Valor total lanches com Carne <span style="color: #ffd100"> R$ ${totalMeats}</span></p>
  </li>
  `;
}

// Mastra apenas os lanches veganos
function showOnlyVegans() {
  const filterOnlyVegans = menuOptions.filter((burger) => burger.vegan);

  showAll(filterOnlyVegans);
}

// Chama os eventos
buttonShowAll.addEventListener("click", () => showAll(menuOptions)); // botão forEch mostrar tudo
buttonShowDiscont.addEventListener("click", showDiscont); // botão map desconto
buttonShowAmount.addEventListener("click", showAmount); // botão reduce somar todos os valores
buttonOnlyVegans.addEventListener("click", showOnlyVegans); // botão filtar mostra os veganos
