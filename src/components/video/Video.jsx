import "./video.scss";

export default function Video() {


  return (
    <video autoPlay loop muted id="video">
      <source src="./assets/videoback.mp4" type="video/mp4" />
    </video>
  );
}
