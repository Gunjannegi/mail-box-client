import classes from './CardComponent.module.css';
const CardComponent = (props) => {
    return (
        <div className={`${classes.card}${props.className}`}>
            {props.children}
        </div>
    )
};
export default CardComponent;