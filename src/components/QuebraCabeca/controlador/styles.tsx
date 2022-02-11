import styled from "styled-components";

export const FraseUsuario = styled.p`
  color: white;
  height: 3vmax;
  font-size: 3vmax;
  text-align: center;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

export const QuadroLetra = styled.div`
  color: white;
  background-color: purple;
  width: 3vmax;
  height: 3vmax;
  font-size: 2vmax;
  text-align: center;
  border: 2px solid black;
  border-radius: 5px;
`;

export const FraseSelecionada = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10vmax;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  font-size: 1.5vmax;
`;

export const Palavra = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  font-size: 2vmax;
`;

export const WrapperLetras = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vmax;
`;

export const BotaoPalavraIngles = styled.button`
  background-color: #4a0061;
  color: white;
  margin-top: 5vmax;
  padding: 1vmax;
  border-radius: 5px;
`;

export const BotaoFrasePortugues = styled.button`
  background-color: #4a0061;
  color: white;
  margin-top: 5vmax;
  padding: 1vmax;
  border-radius: 5px;
`;

export const PalavraIngles = styled.div`
  color: gray;
  font-size: 2vmax;
  height: 3vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vmax;
`;

export const FrasePortugues = styled.p`
  color: gray;
  font-size: 2vmax;
  height: 3vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vmax;
`;

export const WrapperBotoesAjuda = styled.div`
  display: flex;
  justify-content: center;
  gap: 2vmax;
`;
