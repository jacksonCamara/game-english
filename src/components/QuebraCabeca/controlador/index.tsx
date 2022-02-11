import Router, { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import quebraCabecaData from "../../../../data/frases.json";
import { useControladorContext } from "../controladorContext";
import { Letras } from "../letras";
import {
  BotaoFrasePortugues,
  BotaoPalavraIngles,
  FrasePortugues,
  FraseSelecionada,
  Palavra,
  PalavraIngles,
  QuadroLetra,
  WrapperBotoesAjuda,
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

function dividirFrase(frase: string): Array<string> {
  let palavras = frase.split(" ");
  let array = palavras[palavras.length - 1];
  array = array.split("");
  let ultimo = array.pop();
  array = array.join("");
  palavras[palavras.length - 1] = array;
  palavras.push(ultimo);

  return palavras;
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

const gerarIndice = (min: number, max: number): number => {
  let indice;
  do {
    indice = Math.floor(Math.random() * (max - min) + min);
  } while (isIndiceUsado(indice));
  return indice;
};

let indiceUsados: Array<number> = new Array();

function isIndiceUsado(indice: number): boolean {
  if (indiceUsados.includes(indice)) {
    return true;
  } else {
    indiceUsados.push(indice);
    return false;
  }
}

function obterTema(id: string) {
  const tema = quebraCabecaData.find((frase) => frase.id === id);
  if (tema === undefined) throw new Error("Theme not found!");
  return tema;
}

function obterFrase(frases: Array<TFrase>): TFrase {
  let teste = frases[gerarIndice(0, frases.length)];
  return teste;
}

type TFrases = {
  id: string;
  ingles: string;
  portugues: string;
  palavras: Array<string>;
  posicoes: Array<number>;
};

type TTemaSelecionado = {
  id: string;
  categoria: string;
  tema: string;
  vocabulario: string;
  descricao: string;
  frases: Array<TFrases>;
};

const objTemaSelecionado = {
  id: "",
  categoria: "",
  tema: "",
  vocabulario: "",
  descricao: "",
  frases: [],
};

const objFraseSelecionada: TFrase = {
  id: "",
  ingles: "",
  portugues: "",
  palavras: [""],
  posicoes: [],
};

export const Controlador = ({ id }: TControlador) => {
  const router = useRouter();
  const { fraseUsuario, setFraseUsuario } = useControladorContext();
  const [temaSelecionado, setTemaSelecionado] = useState<TTemaSelecionado>(
    obterTema(id)
  );
  const [fraseSelecionada, setFraseSelecionada] =
    useState<TFrase>(objFraseSelecionada);
  const [palavraSelecionadas, setPalavraSelecionadas] = useState([]);
  const [posicaoPalavras, setPosicaoPalavras] = useState([0]);
  const [frasePortugues, setFrasePortugues] = useState("");
  const [respostaCorreta, setRespostaCorreta] = useState("");
  const [respostaUsuario, setRespostaUsuario] = useState("");
  const [palavraIngles, setPalavraIngles] = useState("");

  useEffect(() => {
    let teste = obterTema(id);
    setTemaSelecionado(obterTema(id));
  }, [id]);

  useEffect(() => {
    let teste = obterFrase(temaSelecionado.frases);

    setFraseSelecionada(obterFrase(temaSelecionado.frases));
  }, [temaSelecionado]);

  useEffect(() => {
    setPosicaoPalavras(fraseSelecionada.posicoes);

    setRespostaCorreta(fraseSelecionada.palavras.join(""));
    console.log(fraseSelecionada);
  }, [fraseSelecionada]);

  useEffect(() => {
    let i = 0;
    let j = 0;
    let objPalavraSelecionadas = [...palavraSelecionadas];
    if (objPalavraSelecionadas[posicaoPalavras[i]] !== undefined) {
      while (true) {
        if (
          objPalavraSelecionadas[posicaoPalavras[i]][j].props.children !=
          undefined
        ) {
          if (j >= objPalavraSelecionadas[posicaoPalavras[i]].length - 1) {
            i += 1;
            j = 0;
          } else {
            j += 1;
          }
        } else {
          objPalavraSelecionadas[posicaoPalavras[i]][j] = (
            <QuadroLetra>{fraseUsuario[fraseUsuario.length - 1]}</QuadroLetra>
          );
          setPalavraSelecionadas(objPalavraSelecionadas);
          break;
        }

        if (i >= posicaoPalavras.length) {
          break;
        }
      }
    }

    setRespostaUsuario(fraseUsuario.join(""));
  }, [fraseUsuario]);

  useEffect(() => {
    if (
      respostaCorreta.length === respostaUsuario.length &&
      respostaUsuario.length > 0
    ) {
      if (respostaCorreta === respostaUsuario) {
        setFraseSelecionada(obterFrase(temaSelecionado.frases));
      } else {
        setFraseUsuario([]);
        setFraseSelecionada({ ...fraseSelecionada });
      }
    }
  }, [respostaCorreta, respostaUsuario, temaSelecionado]);

  useEffect(() => {}, [palavraSelecionadas]);

  useEffect(() => {
    let objPalavras = retirarPalavra(
      dividirFrase(fraseSelecionada.ingles),
      fraseSelecionada.posicoes
    );
    setFraseUsuario([]);
    setPalavraSelecionadas(objPalavras);
    setPalavraIngles("");
    setFrasePortugues("");
  }, [fraseSelecionada]);

  function mostrarPalavraIngles() {
    let frase = "";
    fraseSelecionada.palavras.forEach((palavra) => {
      frase = frase + " " + palavra;
    });
    setPalavraIngles(frase);
  }

  function mostrarFrasePortugues() {
    setFrasePortugues(fraseSelecionada.portugues);
  }

  return (
    <>
      <FraseSelecionada>
        {palavraSelecionadas.map((elemento, indice) => {
          return <Palavra key={elemento + indice}>{elemento}</Palavra>;
        })}
      </FraseSelecionada>
      <FrasePortugues>{frasePortugues}</FrasePortugues>
      <PalavraIngles>{palavraIngles}</PalavraIngles>
      <WrapperLetras>
        <Letras palavras={fraseSelecionada.palavras} />
      </WrapperLetras>
      <WrapperBotoesAjuda>
        <BotaoFrasePortugues onClick={mostrarFrasePortugues}>
          Frase Portugues
        </BotaoFrasePortugues>
        <BotaoPalavraIngles onClick={mostrarPalavraIngles}>
          Palavra Inglês
        </BotaoPalavraIngles>
      </WrapperBotoesAjuda>
    </>
  );
};
