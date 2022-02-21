import formatTime from '../utils/formatTime';
interface Props {
  urlThumbnail: string;
  title?: string;
  urlProfile?: string;
  duration: string;
}

const CardVideo = ({ urlThumbnail, title, duration }: Props) => {
  const regex = '[a-z]';
  return (
    <div className="flex justify-center w-full relative">
      <img src={urlThumbnail} alt="video thumbnail" className="w-full" />
      <div className="absolute left-1.5 top-1 text-xs font-semibold bg-black/90">
        {formatTime(duration)}
      </div>
    </div>
  );
};

export default CardVideo;
