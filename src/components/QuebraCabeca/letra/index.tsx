import { useEffect, useState } from "react";
import { useControladorContext } from "../controladorContext";
import { Botao } from "./styles";

type TLetraBotao = {
  letra: string;
};

export const Letra = ({ letra }: TLetraBotao) => {
  const { fraseUsuario, setFraseUsuario } = useControladorContext();
  const [botaoHabilitado, setBotaoHabilitado] = useState(true);

  function selecionar() {
    setFraseUsuario([...fraseUsuario, letra]);
    setBotaoHabilitado(false);
  }

  useEffect(() => {
    if (fraseUsuario.length === 0) setBotaoHabilitado(true);
  }, [fraseUsuario]);

  return (
    <Botao onClick={selecionar} disabled={!botaoHabilitado}>
      {letra}
    </Botao>
  );
};
