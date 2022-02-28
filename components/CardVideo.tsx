import formatTime from '../utils/formatTime';
import { format } from 'timeago.js';
import { MdWatchLater } from 'react-icons/md';
interface Props {
  url: string;
  urlThumbnail: string;
  title?: string;
  urlProfile?: string;
  duration: string;
  createdAt: string;
}

const beforeAfterStyle = [
  'before:transition-all',
  'before:duration-150',
  'before:ease-in-out',
].join(' ');
const beforeStyle = [
  "before:content-['*']",
  'before:absolute',
  'before:bg-violet-700',
  'before:w-[8px]',
  'before:h-[8px]',
  'before:top-0',
  'before:left-0',
  'before:origin-top-left',
  'before:-rotate-45',
  'before:scale-0',
  'hover:before:-rotate-45',
  'hover:before:scale-100',
].join(' ');

const CardVideo = ({
  url,
  urlThumbnail,
  title,
  duration,
  createdAt,
}: Props) => {
  return (
    <a className="flex-col justify-center w-full cursor-pointer" href={url}>
      <div className=" bg-violet-700">
        <div className="relative">
          <img
            src={urlThumbnail}
            alt="video thumbnail"
            className={`w-full hover:translate-x-[6px] hover:translate-y-[-6px] ${beforeAfterStyle} ${beforeStyle}`}
          />
          <div className="absolute right-1 bottom-1 px-1 py-0.5 rounded text-xs font-semibold bg-black/90">
            {formatTime(duration)}
          </div>
        </div>
      </div>
      <div className="p-1">
        <h2 className="text-sm font-semibold">{title}</h2>
        <div className="flex justify-between">
          <h3 className="text-xs text-gray-300">{format(createdAt)}</h3>
          <div className="flex justify-center items-center">
            <button className="hover:scale-125 hover:text-white">
              <MdWatchLater />
            </button>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CardVideo;
