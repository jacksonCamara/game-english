import Router, { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import quebraCabecaData from "../../../../data/frases.json";
import { useControladorContext } from "../controladorContext";
import { FraseSelecionada, Palavra, QuadroLetra } from "./styles";

type TControlador = {
  id: string;
};

type TFrase = {
  id: string;
  ingles: string;
  portugues: string;
  palavras: Array<string>;
  local: Array<number>;
};

function pegarFrase() {
  return quebraCabecaData[0].frases[0];
}

function dividirFrase(frase: string): Array<string> {
  return frase.split(" ");
}

function dividirPalavra(palavras: Array<string>): Array<string> {
  let array = [];
  let letra = [];
  for (let i = 0; i < palavras.length; i++) {
    letra = palavras[i].split("");
    for (let j = 0; j < letra.length; j++) {
      array.push(letra[j]);
    }
  }
  return array;
}

function retirarPalavra(
  palavras: Array<string>,
  local: Array<number>
): (string | Array<ReactElement>)[] {
  let objPalavras: (string | Array<ReactElement>)[] = palavras;
  for (let i = 0; i < local.length; i++) {
    let quadros = [];
    for (let j = 0; j < palavras[local[i]].length; j++) {
      quadros.push(<QuadroLetra></QuadroLetra>);
    }
    objPalavras[local[i]] = quadros;
  }
  return objPalavras;
}

type TLetraBotao = {
  letra: string;
};

export const LetraBotao = ({ letra }: TLetraBotao) => {
  const { fraseUsuario, setFraseUsuario } = useControladorContext();
  function click() {
    setFraseUsuario([...fraseUsuario, letra]);
  }

  return <QuadroLetra onClick={click}>{letra}</QuadroLetra>;
};

export const Controlador = ({ id }: TControlador) => {
  const router = useRouter();
  const { fraseUsuario, setFraseUsuario } = useControladorContext();
  const [fraseSelecionada, setFraseSelecionada] = useState(pegarFrase());
  const [palavraSelecionadas, setPalavraSelecionadas] = useState([]);
  const [letras, setLetras] = useState([""]);

  useEffect(() => {
    let i = 0;
    let j = 0;
    let objPalavraSelecionadas = [...palavraSelecionadas];
    if (objPalavraSelecionadas[fraseSelecionada.local[i]] !== undefined) {
      let teste = 0;
      while (true) {
        // console.log(i + " " + j);
        if (
          objPalavraSelecionadas[fraseSelecionada.local[i]][j].props.children !=
          undefined
        ) {
          // console.log("oi");
          if (
            j >=
            objPalavraSelecionadas[fraseSelecionada.local[i]].length - 1
          ) {
            i++;
            j = 0;
          } else {
            j++;
          }
        } else {
          console.log("aqyu");
          objPalavraSelecionadas[fraseSelecionada.local[i]][j] = (
            <QuadroLetra>{fraseUsuario[fraseUsuario.length - 1]}</QuadroLetra>
          );
          // console.log(fraseUsuario[fraseUsuario.length]);
          setPalavraSelecionadas(objPalavraSelecionadas);
          break;
        }

        if (i >= fraseSelecionada.local.length) {
          break;
        }
      }
    }
    console.log(fraseUsuario);
  }, [fraseUsuario]);

  useEffect(() => {
    let respostaCorreta = fraseSelecionada.palavras.join("");
    let respostaUsuario = fraseUsuario.join("");

    if (respostaCorreta.length === respostaUsuario.length) {
      if (respostaCorreta === respostaUsuario) {
        console.log("parabens vc acerto");
      } else {
        console.log("parabens vc erro");
      }
    }
  }, [fraseUsuario, fraseSelecionada]);

  useEffect(() => {
    // console.log(palavraSelecionadas);
  }, [palavraSelecionadas]);

  useEffect(() => {
    let objPalavras = retirarPalavra(
      dividirFrase(fraseSelecionada.ingles),
      fraseSelecionada.local
    );

    setPalavraSelecionadas(objPalavras);
    // console.log(dividirPalavra(fraseSelecionada.palavras));
    setLetras(dividirPalavra(fraseSelecionada.palavras));
  }, [fraseSelecionada]);

  return (
    <>
      <FraseSelecionada>
        {palavraSelecionadas.map((elemento, indice) => {
          return <Palavra key={elemento + indice}>{elemento}</Palavra>;
        })}
      </FraseSelecionada>
      <FraseSelecionada>
        {letras.map((elemento, indice) => {
          return <LetraBotao key={elemento + indice} letra={elemento} />;
        })}
      </FraseSelecionada>
    </>
  );
};
