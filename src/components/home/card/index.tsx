import Link from "next/link";
import { Container, Descricao, Tema } from "./styles";

type TProps = {
  card: TCard;
};

type TCard = {
  id: string;
  categoria: string;
  tema: string;
  descricao: string;
};

export const Card = ({ card }: TProps) => {
  const { categoria, tema, descricao, id } = card;
  function selecionarTema() {
    console.log(id);
  }
  return (
    <Link
      href={{
        pathname: "/quebra-cabeca",
        query: { id: id },
      }}
    >
      <a>
        <Container onClick={selecionarTema}>
          <Tema>{tema}</Tema>
          <Descricao>{descricao}</Descricao>
        </Container>
      </a>
    </Link>
  );
};
