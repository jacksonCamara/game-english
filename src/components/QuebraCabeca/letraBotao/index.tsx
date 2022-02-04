export const LetraBotao = ({ letra }: TLetraBotao) => {
  const { fraseUsuario, setFraseUsuario } = useControladorContext();
  function click() {
    setFraseUsuario([...fraseUsuario, letra]);
  }

  return <QuadroLetra onClick={click}>{letra}</QuadroLetra>;
};
