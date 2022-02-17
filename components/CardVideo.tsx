interface Props {
  urlThumbnail?: string;
  title?: string;
  urlProfile?: string;
}

const CardVideo = ({ urlThumbnail, title, urlProfile }: Props) => {
  return (
    <div className="flex justify-center w-full">
      <img src={urlThumbnail} alt="video thumbnail" />
    </div>
  );
};

export default CardVideo;
