import { propTypes } from 'react-hammerjs';
import '../../../sass/introcard.scss';


IntroCard.defaultProps = {
    width: 70
}

export default function IntroCard(props) {

    return (
        <div
            style={{ width: props.width + 'vw' }}
        >
            hello
        </div>
    )

}