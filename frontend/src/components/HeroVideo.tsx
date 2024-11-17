export const HeroVideo = () => {
  return (
    <div className="flex justify-center pt-8">
      <video
        src="https://video-links.b-cdn.net/media/videolinks/video/haida.MP4"
        className="max-w-4xl"
        controls={false}
        muted
        autoPlay
      />
    </div>
  );
};
