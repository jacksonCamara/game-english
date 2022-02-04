import { useControladorContext } from "../controladorContext";
import { Botao } from "./styles";

type TLetraBotao = {
  letra: string;
};

export const Letra = ({ letra }: TLetraBotao) => {
  const { fraseUsuario, setFraseUsuario } = useControladorContext();
  function click() {
    setFraseUsuario([...fraseUsuario, letra]);
  }

  return <Botao onClick={click}>{letra}</Botao>;
};
