import './style.scss'
import Blank from '../Blank/index';

type Props = {
    title?: string;
    children?: any;
}

const CenterCard = (props: Props) => {
    return (
        <>
            <Blank title={props?.title ? props.title : "Gabir Motors"}>
                <div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-container uk-position-center">
                    <div className="uk-animation-slide-top-medium uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large" style={{ maxHeight: '95vh' }}>
                        {props?.children}
                    </div>
                </div>
            </Blank>
        </>
    )
}

export default CenterCard
