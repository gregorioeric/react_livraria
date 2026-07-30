const Card = ({ livro }) => {
  return (
    <div className="livro">
      <h1>{livro.titulo}</h1>
      <p>{livro.autor}</p>
    </div>
  );
};

export default Card;
