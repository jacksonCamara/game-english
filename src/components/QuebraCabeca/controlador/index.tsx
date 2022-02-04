import Router, { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import quebraCabecaData from "../../../../data/frases.json";
import { useControladorContext } from "../controladorContext";
import { Letra } from "../letra";
import { Letras } from "../letras";
import {
  FraseSelecionada,
  Palavra,
  QuadroLetra,
  WrapperLetras,
} from "./styles";

type TControlador = {
  id: string;
};

type TFrase = {
  id: string;
  ingles: string;
  portugues: string;
  palavras: Array<string>;
  posicoes: Array<number>;
};

function pegarFrase() {
  return quebraCabecaData[0].frases[0];
}

function dividirFrase(frase: string): Array<string> {
  return frase.split(" ");
}

function retirarPalavra(
  palavras: Array<string>,
  posicoes: Array<number>
): (string | Array<ReactElement>)[] {
  let objPalavras: (string | Array<ReactElement>)[] = palavras;
  for (let i = 0; i < posicoes.length; i++) {
    let quadros = [];
    for (let j = 0; j < palavras[posicoes[i]].length; j++) {
      quadros.push(<QuadroLetra></QuadroLetra>);
    }
    objPalavras[posicoes[i]] = quadros;
  }
  return objPalavras;
}

export const Controlador = ({ id }: TControlador) => {
  const router = useRouter();
  const { fraseUsuario, setFraseUsuario } = useControladorContext();
  const [fraseSelecionada, setFraseSelecionada] = useState(pegarFrase());
  const [palavraSelecionadas, setPalavraSelecionadas] = useState([]);

  useEffect(() => {
    let i = 0;
    let j = 0;
    let objPalavraSelecionadas = [...palavraSelecionadas];
    if (objPalavraSelecionadas[fraseSelecionada.posicoes[i]] !== undefined) {
      let teste = 0;
      while (true) {
        if (
          objPalavraSelecionadas[fraseSelecionada.posicoes[i]][j].props.children !=
          undefined
        ) {
          if (
            j >=
            objPalavraSelecionadas[fraseSelecionada.posicoes[i]].length - 1
          ) {
            i++;
            j = 0;
          } else {
            j++;
          }
        } else {
          objPalavraSelecionadas[fraseSelecionada.posicoes[i]][j] = (
            <QuadroLetra>{fraseUsuario[fraseUsuario.length - 1]}</QuadroLetra>
          );
          // console.log(fraseUsuario[fraseUsuario.length]);
          setPalavraSelecionadas(objPalavraSelecionadas);
          break;
        }

        if (i >= fraseSelecionada.posicoes.length) {
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

  useEffect(() => {}, [palavraSelecionadas]);

  useEffect(() => {
    let objPalavras = retirarPalavra(
      dividirFrase(fraseSelecionada.ingles),
      fraseSelecionada.posicoes
    );

    setPalavraSelecionadas(objPalavras);
  }, [fraseSelecionada]);

  return (
    <>
      <FraseSelecionada>
        {palavraSelecionadas.map((elemento, indice) => {
          return <Palavra key={elemento + indice}>{elemento}</Palavra>;
        })}
      </FraseSelecionada>
      <WrapperLetras>
        <Letras palavras={fraseSelecionada.palavras} />
      </WrapperLetras>
    </>
  );
};
