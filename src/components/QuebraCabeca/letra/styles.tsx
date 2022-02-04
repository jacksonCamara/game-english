import styled from "styled-components";

export const Botao = styled.button`
  color: white;
  background-color: purple;
  font-size: 3vmax;
  border: 2px solid white;
  border-radius: 5px;
  cursor: pointer;
  padding: 1vmax 2vmax;
  transition: background-color 300ms ease-in-out;

  &:hover {
    background-color: #550055;
  }

  &:disabled {
    background-color: gray;
  }
`;
