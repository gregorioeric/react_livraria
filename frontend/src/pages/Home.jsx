import Card from "../components/Card";
import { useState, useEffect } from "react";

const Home = () => {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const getLivros = async () => {
      const res = await fetch("http://localhost:7808/books");
      const data = await res.json();

      setLivros(data);
    };

    getLivros();
  }, []);

  if (livros.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {livros.map((livro) => (
          <Card key={livro.id_livro} livro={livro} />
        ))}
      </div>
    </div>
  );
};

export default Home;
