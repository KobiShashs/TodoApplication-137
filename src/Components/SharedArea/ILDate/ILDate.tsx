import "./ILDate.css";
import moment from "moment";
interface ILDateProps{
    date:Date;
}
function ILDate(props:ILDateProps): JSX.Element {
    return (
        <div className="ILDate">
			<p> Date : { moment(props.date).format('DD/MM/yyyy')} </p>
        </div>
    );
}

export default ILDate;
