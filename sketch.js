//variáveis Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;

//velocidade bolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

//variáveis Minha Raquete
let xMinhaRaquete = 5;
let yMinhaRaquete = 160;
let lgrMinhaRaquete = 7;
let altMinhaRaquete = 60;

//variáveis Raquete Oponente
let xRaqueteOponente = 586;
let yRaqueteOponente = 160;
let lgrRaqueteOponente = 7;
let altRaqueteOponente = 60;
let velocidadeYOponente;

let colidiu = false;

//placar jogo
let MeusPontos = 0;
let PontosOponente = 0;

//sons do jogo
let raquetada;
let trilha;
let ponto;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//Oponente errar
let chanceDeErrar = 0;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  velocidadeBolinha();
  colisãoBorda();
  mostrarRaquete(xMinhaRaquete, yMinhaRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  //verificaColisãoMinhaRaquete();
  colisaoRaquetesBiblioteca(xMinhaRaquete, yMinhaRaquete);
  colisaoRaquetesBiblioteca(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  mostrarplacar();
  contarpontos();
}

function mostrarBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function velocidadeBolinha() {
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
}

function colisãoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXbolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYbolinha *= -1;
  }
}

function mostrarRaquete(x, y) {
  rect(x, y, lgrMinhaRaquete, altMinhaRaquete);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yMinhaRaquete -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yMinhaRaquete += 5;
  }
}

function verificaColisãoMinhaRaquete() {
  if (
    xBolinha - raio < xMinhaRaquete + lgrMinhaRaquete &&
    yBolinha - raio < yMinhaRaquete + altMinhaRaquete &&
    yBolinha + raio > yMinhaRaquete
  ) {
    velocidadeXbolinha *= -1;
  }
}

function colisaoRaquetesBiblioteca(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    lgrMinhaRaquete,
    altMinhaRaquete,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente =
    yBolinha - yRaqueteOponente - lgrRaqueteOponente / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculeChanceDeErrar();
}

function calculeChanceDeErrar() {
  if (PontosOponente >= MeusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39) {
      chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 33) {
      chanceDeErrar = 33;
    }
  }
}

function mostrarplacar() {
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 69, 0));
  rect(210, 4, 50, 30);
  fill(255);
  text(MeusPontos, 235, 25);
  fill(color(255, 69, 0));
  rect(360, 4, 50, 30);
  fill(255);
  text(PontosOponente, 385, 25);
}

function contarpontos() {
  if (xBolinha > 592) {
    MeusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 7) {
    PontosOponente += 1;
    ponto.play();
  }
}
