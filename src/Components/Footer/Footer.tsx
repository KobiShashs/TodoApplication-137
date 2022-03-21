import SocialMedia from "../SocialMedia/SocialMedia";
import Total from "../Total/Total";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <SocialMedia />
            <p>All rights reserved to Adir the Original &copy;</p>
            <Total />
        </div>
    );
}

export default Footer;
