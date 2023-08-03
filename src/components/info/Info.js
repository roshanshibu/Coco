import "./Info.css";
import CocoIcon from "../../assets/coco-logo.png";

const Info = () => {
  return (
    <div className="infoContainer">
      <div>
        <img src={CocoIcon} className="cocoIcon" />
        <h1>Coco: Music Streaming</h1>
      </div>
      <p>
        Coco is a proof of concept for a music streaming platform with a unique
        recommendation system. New music is recommended to the user through
        cards that play a snippet of the chorus. This method was found to be
        very efficient in usability testing. Coco was designed from the ground
        up with a strong focus on the user experience and implemented using
        React.
      </p>
      <p className="box">
        View my other projects at &nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.roshanshibu.com"
        >
          www.roshanshibu.com
        </a>
      </p>
    </div>
  );
};

export default Info;
