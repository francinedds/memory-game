import React, { useState, useEffect } from 'react';
import { ArrowClockwise, Star, X, ArrowRight, ArrowLeft } from '@phosphor-icons/react';
import './App.css';
import boloImg from './assets/images/img-bolo.png';
import chocolateImg from './assets/images/img-chocolate.png';
import cerejaImg from './assets/images/img-cereja.png';
import picoleImg from './assets/images/img-picole.png';
import pizzaImg from './assets/images/img-pizza.png';
import sorveteImg from './assets/images/img-sorvete.png';

const cartasIniciais = [
  boloImg,
  chocolateImg,
  cerejaImg,
  picoleImg,
  pizzaImg,
  sorveteImg,
];

function embaralharCartas() {
  const duplicadas = [...cartasIniciais, ...cartasIniciais];
  return duplicadas
  .map((imagem) => ({ imagem, id: Math.random(), virada: false, combinada: false }))
  .sort(() => Math.random() - 0.5);
}

function App() {
  const [cartas, setCartas] = useState(embaralharCartas());
  const [escolha1, setEscolha1] = useState(null);
  const [escolha2, setEscolha2] = useState(null);
  const [bloquear, setBloquear] = useState(false);

  useEffect(() => {
    if (escolha1 && escolha2) {
      setBloquear(true);
      if (escolha1.imagem === escolha2.imagem) {
        setCartas((prev) =>
          prev.map((carta) =>
            carta.imagem === escolha1.imagem
              ? { ...carta, combinada: true }
              : carta
          )
        );
        resetarEscolhas();
      } else {
        setTimeout(() => {
          resetarEscolhas();
        }, 1000);
      }
    }
  }, [escolha1, escolha2]);

  function handleClique(carta) {
    if (bloquear || carta === escolha1 || carta.combinada) return;
    escolha1 ? setEscolha2(carta) : setEscolha1(carta);
  }

  function resetarEscolhas() {
    setEscolha1(null);
    setEscolha2(null);
    setBloquear(false);
  }

  function novaPartida() {
    setCartas(embaralharCartas());
    setEscolha1(null);
    setEscolha2(null);
    setBloquear(false);
  }

  return (
    <div className="wrapper">
      <div className="window">
        <div className="window-header">
          <span className="window-title">Memory Game</span>
          <div className="window-buttons">
            <X size={16} weight="bold" color="#fff" />
          </div>
        </div>

        <div className="game container">
          <header className="game-header">
            <ArrowLeft className="arrow-left" size={20} weight="bold" color="#946a70" />
            <ArrowRight size={20} weight="bold" color="#946a70" />
            <button onClick={novaPartida} title="Restart game">
              <ArrowClockwise className="icon-refresh" size={20} weight="bold"/>
            </button>
            <h1>
              localhost:memorygame
              <Star className='icon-star' size={16} weight="fill" />
            </h1>
          </header>
          <div className="game-main">
            <div className="tabuleiro">
              {cartas.map((carta) => {
                const virada = carta === escolha1 || carta === escolha2 || carta.combinada;
                  return (
                    <div
                      key={carta.id}
                      className="carta"
                      onClick={() => handleClique(carta)}
                    >
                      {virada ? (
                        <img src={carta.imagem} alt="carta" className="imagem-carta" />
                      ) : (
                        <div className="verso"></div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;