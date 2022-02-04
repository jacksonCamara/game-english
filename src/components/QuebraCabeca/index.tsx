import { Controlador } from "./controlador";
import { ControladorContextProvider } from "./controladorContext";

type TQuebraCabeca = {
  id: string;
};

export const QuebraCabeca = ({ id }: TQuebraCabeca) => {
  return (
    <ControladorContextProvider>
      <Controlador id={id} />
    </ControladorContextProvider>
  );
};
