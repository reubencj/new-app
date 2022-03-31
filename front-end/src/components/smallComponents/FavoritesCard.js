const FavoritesCard = (props) => {
  const { title, media, author } = props;

  return (
    <div className="container border border-dark">
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <img src={media} alt={title} />
      </div>
      <div>
        <p>{author}</p>
      </div>
    </div>
  );
};

export default FavoritesCard;
