import "./SocialMedia.css";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from "react-icons/fa";
function SocialMedia(): JSX.Element {
    return (
        <div className="SocialMedia">
            <FaFacebook className="image-distance" size={42} />
            <FaTwitter className="image-distance" size={42} />
            <FaGithub className="image-distance" size={42} />
            <FaTiktok className="image-distance" size={42}/>
            <FaInstagram className="image-distance" size={42} />
            <FaLinkedin className="image-distance" size={42}/>
        </div>
    );
}

export default SocialMedia;
