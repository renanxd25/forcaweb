/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
   const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 7;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;

/*Objeto que recebe varios valores de palavras*/
const categorias = {
    frutas:["Banana", "Maçã", "Laranja","Abacate","Morango","Cacau"],
    profissao:["Engeinheiro", "Massoterapeuta", "Advogado", "Agiota", "Sorveteiro", "Caloteiro"],
    cor:["Azul","Vermelho","Verde","Amarelo", "Laranja", "Violeta", "Rosa","Vinho","Branco","Preto"],
    animais:["Cachorro", "Gato", "Passaro", "Galinha", "Pato", "Dinossauro", "Tamandua"]
}
/* funcao "retornaArrayCategorias" possui um metodo Object.keys() que retorna as chaves de cada elemento do obejto para o seu parametro */
function retornaArrayCategorias(){
    return Object.keys(categorias);
}
/*A funcao "retornaCategoria() possiu em seu escopo a constante "arraycategorias" que recebe a o retorno da funcao a cima "retornaCategoria()"
  ela tbm possui uma variavel "indiceCategorias" que recebe o valor de retorno de uma outra funcao chamada "retornNumAleatorio()" que recebe em seu parametro
  o tamanho das chaves do objeto declarado por meio do "arrayCategorias.length". A funcao retorna para o seu parametro o indice  com nome de cada categoria
*/
function retornaCategoria(){
    const arrayCategorias = retornaArrayCategorias();
    let indiceCategorias = retornNumAleatorio(arrayCategorias.length)
    return arrayCategorias[indiceCategorias]

}
/*A funcao exibirCategorias()  recebe a constante categorias declaradas anteriomente e nela instancia um innerHTML que receble o valor de da funcao "retornaCategoria()"*/
function exibirCategorias(){
    categoria.innerHTML = retornaCategoria()
}

/*funcao retornNumAleatorio(max) recebe o retono do valor ponto flutuante retorna o valor inteiro*/
function retornNumAleatorio(max){
    return Math.floor(Math.random()*max);
}
/*A "funcao definePalavraPropsta()" recebe em seu escopo uma constante "arrayPalavras" e ela recebe os valores das chaves do objeto caregorias
  Logo abaixo existe uma variavel "indicePalavra" que recebe  a funcao que contem um numero aleatorio de acordo com o tamanho do array de palavras
  Logo abaixo a variavel palavraProposta recebe uma palavra sorteada
  Logo mais abaixo a funcao "ocultaPalavra()" que e uma funcao que oculta a palavra exibida e a subistitui por tracinhos 
*/
function definiePalavraProposta(){
    const arrayPalavras = categorias[categoria.innerHTML];
    let indicePalavra = retornNumAleatorio(arrayPalavras.length)
    palavraProposta = arrayPalavras[indicePalavra];
     console.log(palavraProposta)
     ocultaPalavra()

}
/*A funcao "ocutaPalavra()" ele contem uma recebe uma variavel palavraOcutado que recebe uma string vazia
    Logo abaixo inicializa um laço for que contem uma variavel "i" que recebe uma valor zero e a condicao dela é ser menor que o tamanho da variavel palavraProposta
    Dentro do escopo do laço a variavel "palavraOcutada" e interada com  - de acordo com o tamanho das interações do laço
    depois do laço dentro do escopo da função "ocultaPalavra()" e chamada uma outra funcao chamada "exibePalavrainterface(palavraOcultada)" 
    que recebe a variavel palavra ocultada em seu parametro.
*/
function ocultaPalavra(){
    let palavraOcultada="";
    for(let i=0; i < palavraProposta.length; i++){
        palavraOcultada += "-"
    }
    exibePalavrainterface(palavraOcultada);
}

/*A funcao exibrePalavrainterface(palavra) mostra o valor da palavra na pagina HTML*/
function exibePalavrainterface(palavra){
    palavraInterface.innerHTML = palavra;
}

/*A funcao "tentativa(letra)" tem em seu escopo uma condicoes 
  a primeira condição   
*/
function tentativa(letra){
    if(palavraProposta.includes(letra)){
        atualizaPalavraInterface(letra)
    }else{
        letrasErradasArray.push(letra);
        letrasErradas.innerHTML = "Letras erradas:" + letrasErradasArray;
        if(partesBoneco.length > indiceBoneco){
            desenhaBoneco();
        }
    }
    verificarFimdeJogo()

}
function verificarFimdeJogo(){
    if(!palavraInterface.innerHTML.includes("-")){
        exibePalavrainterface("Você venceu");
        window.removeEventListener("keypress", retornaLetra);
    }else if(letrasErradasArray.length >= numTentativas){
        desenhaOlhos();
        exibePalavrainterface("Você Perdeu")
        window.removeEventListener("keypress", retornaLetra)
    }
}

function atualizaPalavraInterface(letra){
    let palavraAux = "";
    for(let i=0; i < palavraProposta.length; i++){
        if(palavraProposta[i]===letra){
            palavraAux += letra;
        }else if(palavraInterface.innerHTML[i] != "-"){
            palavraAux += palavraInterface.innerHTML[i];
        }else{
            palavraAux += "-"
        }
    }
    exibePalavrainterface(palavraAux)
}

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){ 
    tentativa(e.key);
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    indiceBoneco = 0;
    ocultaBoneco();
    exibirCategorias();
    definiePalavraProposta();
    letrasErradasArray = [];
    letrasErradas.innerHTML = "Letras erradas: ";
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);
