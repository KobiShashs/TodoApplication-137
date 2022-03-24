import moment from "moment";
import "./ILTime.css";

interface ILTimeProps{
    date:Date
}
function ILTime(props:ILTimeProps): JSX.Element {
    return (
        <div className="ILTime">
			<p> Time : { moment(props.date).format('hh:mm:ss')} </p>
        </div>
    );
}

export default ILTime;
