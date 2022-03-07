interface Props {
  games: Array<{ id: string; name: string; box_art_url: string }>;
}
const GameGrid = ({ games }: Props) => {
  return (
    <div className="flex flex-wrap">
      {games &&
        games.map(({ id, name, box_art_url }) => {
          const boxArtUrl = box_art_url
            .replace('{width}', '188')
            .replace('{height}', '250');
          return <img key={id} src={boxArtUrl} alt="box art" />;
        })}
    </div>
  );
};

export default GameGrid;
