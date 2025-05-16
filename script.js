document.addEventListener("DOMContentLoaded", function () {
  const btnAbrirCarrinho = document.getElementById("abrir-carrinho");
  const btnFecharCarrinho = document.getElementById("fechar-carrinho");
  const carrinho = document.getElementById("carrinho");
  const listaCarrinho = document.getElementById("lista-carrinho");
  const totalCarrinho = document.getElementById("total-carrinho");

  let itensCarrinho = [];

  function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";
    let total = 0;

    itensCarrinho.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.nome} - R$${item.preco.toFixed(2)} `;

      const btnRemover = document.createElement("button");
      btnRemover.textContent = "❌";
      btnRemover.classList.add("btn-remover");
      btnRemover.addEventListener("click", () => {
        removerItemCarrinho(index);
      });

      li.appendChild(btnRemover);
      listaCarrinho.appendChild(li);

      total += item.preco;
    });

    totalCarrinho.textContent = total.toFixed(2);
  }

  function removerItemCarrinho(index) {
    itensCarrinho.splice(index, 1);
    atualizarCarrinho();
  }

  function adicionarAoCarrinho(nome, preco) {
    itensCarrinho.push({ nome, preco });
    atualizarCarrinho();
  }

  document.querySelectorAll(".btn-adicionar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nome = btn.getAttribute("data-nome");
      const preco = parseFloat(btn.getAttribute("data-preco"));
      adicionarAoCarrinho(nome, preco);
    });
  });

  btnAbrirCarrinho.addEventListener("click", () => {
    carrinho.style.display = "block";
  });

  btnFecharCarrinho.addEventListener("click", () => {
    carrinho.style.display = "none";
  });

  document.getElementById("finalizar-pedido").addEventListener("click", () => {
    if (itensCarrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    let mensagem = "Olá, gostaria de fazer o seguinte pedido:%0A";
    itensCarrinho.forEach((item) => {
      mensagem += `- ${item.nome} - R$${item.preco.toFixed(2)}%0A`;
    });
    mensagem += `%0ATotal: R$${parseFloat(totalCarrinho.textContent).toFixed(2)}`;

    const url = `https://wa.me/5544920029366?text=${mensagem}`;
    window.open(url, "_blank");
  });
});
