import { useEffect, useState } from "react";
import { Letra } from "../letra";
import { Container } from "./styles";

function dividirPalavra(palavras: Array<string>): Array<string> {
  let todasLetras = [];
  let letras = [];

  for (let i = 0; i < palavras.length; i++) {
    letras = palavras[i].split("");
    for (let j = 0; j < letras.length; j++) {
      todasLetras.push(letras[j]);
    }
  }

  return todasLetras;
}

function embaralharLetra(letras: Array<string>): Array<string> {
  return letras.sort(() => Math.random() - 0.5);
}

type TLetras = {
  palavras: Array<string>;
};

export const Letras = ({ palavras }: TLetras) => {
  const [letras, setLetras] = useState([""]);

  useEffect(() => {
    let letras = dividirPalavra(palavras);
    letras = embaralharLetra(letras);
    setLetras(dividirPalavra(letras));
  }, [palavras]);

  return (
    <Container>
      {letras.map((letra, indice) => {
        return <Letra key={letra + indice + letras.join("")} letra={letra} />;
      })}
    </Container>
  );
};
