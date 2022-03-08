interface Props {
  games: Array<{ id: string; name: string; box_art_url: string }>;
}
const GameGrid = ({ games }: Props) => {
  return (
    <div className="w-full">
      <h2 className="font-bold mb-3 text-3xl">Trending</h2>
      <div className="grid lg:grid-cols-10 sm:grid-cols-5 grid-cols-5 gap-3 mx-auto">
        {games &&
          games.map(({ id, name, box_art_url }) => {
            const boxArtUrl = box_art_url
              .replace('{width}', '188')
              .replace('{height}', '250');
            return (
              <div key={id} className="w-full">
                <img className="w-full" src={boxArtUrl} alt="box art" />
                <h3 className="text-xs font-bold truncate pt-1">{name}</h3>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GameGrid;
