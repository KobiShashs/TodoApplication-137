import "./Circle.css";
interface CircleProps {
    val: number;
}
function Circle(props: CircleProps): JSX.Element {
    return (
        <div className={props.val > 0 ? 'full' : 'empty'}>{props.val}</div>
    );
}

export default Circle;
