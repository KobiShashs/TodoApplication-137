import "./EmptyView.css";

interface EmptyViewProps{
    msg: string;
}
function EmptyView(props: EmptyViewProps): JSX.Element {
    return (
        <div className="EmptyView">
			<h1>{props.msg}</h1>
            <img src ="https://media.giphy.com/media/dBZb8nAfLfOZ8B0CHA/giphy.gif" alt=""/>
        </div>
    );
}

export default EmptyView;
