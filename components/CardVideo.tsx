import { useEffect, useState } from 'react';
import formatTime from '../utils/formatTime';
import { format } from 'timeago.js';
import { MdWatchLater } from 'react-icons/md';
import { motion } from 'framer-motion';
import ButtonBoop from './ButtonBoop';
import axios from 'axios';
import Skeleton from './skeleton/Skeleton';

interface Props {
  videoId: string;
  url: string;
  urlThumbnail: string;
  title?: string;
  urlProfile?: string;
  duration: string;
  createdAt: string;
  isWatchLater?: boolean;
  onAddWatchLater: (id: string) => void;
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

export const SkeletonCardVideo = () => {
  return (
    <div>
      <Skeleton>
        <div className="w-full after:content-[''] after:block after:pb-[56%]"></div>
      </Skeleton>
      <div className="py-3">
        <Skeleton width={'100%'} height={24} boxHeight={48} />
      </div>
    </div>
  );
};

const CardVideo = ({
  videoId,
  url,
  urlThumbnail,
  title,
  duration,
  createdAt,
  isWatchLater,
  onAddWatchLater,
}: Props) => {
  return (
    <div>
      <div className=" bg-violet-700">
        <a className="flex-col justify-center w-full cursor-pointer" href={url}>
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
        </a>
      </div>
      <div className="p-1">
        <h2 className="text-sm font-semibold">{title}</h2>
        <div className="flex justify-between">
          <h3 className="text-xs text-gray-300">{format(createdAt)}</h3>
          <div className="flex justify-center items-center">
            <ButtonBoop onClick={() => onAddWatchLater(videoId)}>
              <MdWatchLater
                className={isWatchLater ? 'text-slate-50' : 'text-slate-500'}
              />
            </ButtonBoop>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardVideo;
