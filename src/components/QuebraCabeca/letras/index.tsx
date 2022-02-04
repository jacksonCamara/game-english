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

type TLetras = {
  palavras: Array<string>;
};

export const Letras = ({ palavras }: TLetras) => {
  const [letras, setLetras] = useState([""]);

  useEffect(() => {
    setLetras(dividirPalavra(palavras));
  }, [palavras]);

  return (
    <Container>
      {letras.map((letra, indice) => {
        return <Letra key={letra + indice} letra={letra} />;
      })}
    </Container>
  );
};
