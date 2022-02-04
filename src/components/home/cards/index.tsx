import frases from "../../../../data/frases.json";
import { Card } from "../card";
import { Container } from "./styles";

export const Cards = () => {
  return (
    <Container>
      {frases.map((card) => {
        return <Card key={card.id} card={card} />;
      })}
    </Container>
  );
};
