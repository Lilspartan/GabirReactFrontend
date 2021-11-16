import Header from "../../components/Header";
import { SocialMediaLink } from '../../interfaces';
import Blank from '../../Templates/Blank';

type CardProps = {
    image: string;
    title: string;
    children?: any;
    link: string;
    target?: string;
    credit?: {
        links?: SocialMediaLink[];
    };
}

const Toolbox = () => {
    const Card = (props: CardProps) => {
        return (
            <div className = "uk-padding-medium" style = {{ marginTop: "20px" }}>
                <div className="uk-flex uk-flex-center uk-flex-middle">
                    <a href = {props.link} target = {props.target ? props.target : "_new"} className="uk-display-block uk-card uk-card-secondary uk-link-toggle uk-card-hover">
                        <div className="uk-card-media-top">
                            <img src={props.image} alt="" style = {{ width: '1000px' }} className = "uk-box-shadow-large" />
                        </div>
                        <div className="uk-card-body">
                            <h1 style = {{ letterSpacing: "0.6px", fontSize: "36px"}} className="uk-card-title">{props.title}</h1>
                            {props?.children}
                        </div>
                    </a>
                </div>
            </div>

        )
    }

    return (
        <Blank title = "Toolbox">
            <div className = "uk-child-width-1-1@s uk-child-width-1-3@m" style = {{ padding: "40px"}} uk-grid="masonry: true;">
                <Card 
                    link = "https://www.tradingpaints.com/collections/view/76489/Penny-Arcade-Liveries" 
                    image = "https://i.gabirmotors.com/downloads/b7c1c51a-dc4e-4e22-8ebd-3fb1787a83e8.png"
                    title = "Gabir Motors / PA League Liveries"
                >
                    <p>Spruce up your car and represent the best pretend motorports company!</p>
                    
                </Card>

                <Card 
                    link = "/specmapping" 
                    image = "img/specmapdemo.png"
                    title = "Gabir Motors Spec Map Previsualization Tool"
                    target = "_self"
                >
                    <p>The tool that started it all, the Spec Mapping tool helps you refine those tricky numbers that nobody <i>really</i> understands</p>
                </Card>

                <Card 
                    link = "/assets" 
                    image = "https://i.gabirmotors.com/assets/teams/GM/chrome.jpg"
                    title = "Gabir Motors Assets"
                    target = "_self"
                >
                    <p>THE place to go for PA League or Gabir Motors related images, want a big Gabir logo for the hood of your Mazda? Go here! Want to represent your endurance team? Grab their logo!</p>
                </Card>

                {/* <Card 
                    link = "#" 
                    image = "img/Gabir_Colors.png"
                    title = "The Colors of Gabir Motors"
                    target = "_self"
                ></Card> */}
            </div>
        </Blank>
    )
}

export default Toolbox
