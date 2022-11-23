import { isMobile } from "react-device-detect";

interface Props {
  src: string;
}

export default function Video({ src }: Props) {
  return (
    <iframe
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      frameBorder="0"
      height="315"
      src={src}
      title="YouTube video player"
      width={isMobile ? 400 : 560}
    />
  );
}
