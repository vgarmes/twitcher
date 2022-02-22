import formatTime from '../utils/formatTime';
import { format } from 'timeago.js';
interface Props {
  urlThumbnail: string;
  title?: string;
  urlProfile?: string;
  duration: string;
  createdAt: string;
}

const CardVideo = ({ urlThumbnail, title, duration, createdAt }: Props) => {
  const regex = '[a-z]';
  return (
    <div className="flex-col justify-center w-full">
      <div className="relative">
        <img src={urlThumbnail} alt="video thumbnail" className="w-full" />
        <div className="absolute right-1 bottom-1 px-1 py-0.5 rounded text-xs font-semibold bg-black/90">
          {formatTime(duration)}
        </div>
      </div>
      <h2 className="text-sm font-semibold pt-1">{title}</h2>
      <h3 className="text-xs text-right text-gray-300">{format(createdAt)}</h3>
    </div>
  );
};

export default CardVideo;
