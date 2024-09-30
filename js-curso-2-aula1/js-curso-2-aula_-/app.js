//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do Numero Secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = "Digite um numero de 1 a 10";

let listaDeNumerosSorteados = []
let numeroLimite = 10;
let numeroSecreto = gerarNumAleatorio();
let tentativas = 1;

function exbirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

mensagemInicial();

function mensagemInicial(){
    exbirTextoNaTela('h1', 'Jogo do numero secreto');
    exbirTextoNaTela('p', 'Digite um numero de 1 a 10');
}


function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        exbirTextoNaTela('h1','Voce acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa},`;
        exbirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exbirTextoNaTela('p','O numero secreto e menor');
        } else{
            exbirTextoNaTela('p','O numero secreto e maior');
        }
        tentativas++
        limparCampo();
    }
}

function gerarNumAleatorio(){
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumAleatorio();
    }   else {
            listaDeNumerosSorteados.push(numeroEscolhido);
            console.log(listaDeNumerosSorteados);
            return numeroEscolhido;
        }
    
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}