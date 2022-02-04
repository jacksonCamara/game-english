import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
} from "react";

type TControladorContext = {
  fraseUsuario: Array<string>;
  setFraseUsuario: (frase: SetStateAction<Array<string>>) => void;
};

const ControladorContext = createContext<TControladorContext | undefined>(
  undefined
);

type TControladorContextProvider = {
  children: ReactNode;
};

export const ControladorContextProvider = ({
  children,
}: TControladorContextProvider) => {
  const [fraseUsuario, setFraseUsuario] = useState<Array<string>>([]);

  return (
    <ControladorContext.Provider value={{ fraseUsuario, setFraseUsuario }}>
      {children}
    </ControladorContext.Provider>
  );
};

export function useControladorContext() {
  const context = useContext(ControladorContext);

  if (context === undefined) {
    throw new Error("Contexto indefinido");
  }

  return context;
}
