import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

const Fade = ({ in: inProp, ...props }) => {
    return <>
        <Transition in={inProp} timeout={duration}>
            {state => {
                console.log(state);
                return (
                    <div style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                        {props.children}
                    </div>
                )
            }}
        </Transition>
    </>
};
export default Fade;