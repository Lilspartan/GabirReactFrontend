/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link, withRouter, RouteComponentProps  } from 'react-router-dom'
import RightTab from './RightTab'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RightTabLink from './RightTabLink'
import { FC, useState, useEffect } from 'react';
import ShareButton from '../components/ShareButton';

interface Props extends RouteComponentProps {
  title: string;
  desc?: string;
  auth?: any;
}

const Header:FC<Props> = (props) => {
  const { title = "Gabir Motors", desc = 'The world’s premiere, pretend Motorsports Company. Proud sponsor of Mike Racecar and the Penny Arcade iRacing league.' } = props;
  
  useEffect(() => {
    (async () => {
      var res = await fetch('https://streaming.gabirmotors.com/dodotd');
      var data = await res.json();

      if (res.status === 200) {
        setDriveroftheday(data.do);
      }
    })();
  })

  const [driveroftheday, setDriveroftheday] = useState(false)

  const isMobileOrTabletDevice = () => {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
      return check;
  }

  const useMobileDevice = () => {
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  
    useEffect(() => {
      setIsMobileOrTablet(isMobileOrTabletDevice());
    });
  
    return [isMobileOrTablet];
  };  

  //console.log("      _________________   ____  ____  ___       \n     /  ______________/  /   / /   / /   \\     \n    /  /      _______   /   / /   / /    /      \n   /  /      /____  /  /   / /   / /    /       \n  /  /___________/ /  /   / /   / /    /        \n  \\_______________/  /___/ /___/ /____/         \n");
  
  return (
    <header>
      <title>{ title }</title>
      <meta
        name="description"
        content= {desc}
      />
      <div uk-sticky = "true">
        {/* eslint-disable-next-line */}
        <a id = "menuopen" className="uk-margin-small-right uk-position-top-left"uk-toggle="target: #offcanvas-slide" href = "#"><span uk-icon="icon: menu; ratio: 2" style = {{color: 'white'}}></span></a>
      </div>

      <RightTab id = "draw4"> 
        
      </RightTab>

      <div id="offcanvas-slide" uk-offcanvas="mode: slide;">
        <div className="uk-offcanvas-bar uk-flex uk-flex-column">

        <ul uk-nav = "true" className="uk-text-center uk-nav-primary uk-margin-auto-vertical" uk-scrollspy="cls: uk-animation-slide-left-medium; target: .nav-text,.uk-logo; delay: 50;">
            <li className="uk-logo"><Link to="/"><img src = "../img/logo.png" alt = "GM logo" style = {{width: '14vw', height: 'auto', minWidth: '200px'}}/></Link></li>

            <RightTabLink id = "draw4link" target = "draw4" type = "success"></RightTabLink>

            { driveroftheday && <Link to = "/vote" className = { `uk-text-success` }>Livery Parade Vote</Link> }
            <li className="uk-nav-divider"></li>
            
            <li><Link className = "uk-button-link uk-text-primary nav-text" to = "/haikus">Haikus</Link></li>
            <li><Link className = "uk-button-link uk-text-primary nav-text" to = "/quotes">Quotes</Link></li>
            <li><Link className = "uk-button-link uk-text-primary nav-text" to = "/calendar">Calendar</Link></li>
            <li><Link className = "uk-button-link uk-text-primary nav-text" to = "/teams">Teams</Link></li>
            <li><Link className = "uk-button-link uk-text-primary nav-text" to = "/assets">Assets</Link></li>
            <li><Link className = "uk-button-link uk-text-primary nav-text" to = "/standings">Standings</Link></li>
            <li><Link className = "uk-button-link uk-text-primary nav-text" to = "/tutorial">Tutorials</Link></li>
            
            <li className="uk-nav-divider"></li>
            <li uk-scrollspy="cls: uk-animation-slide-top; target: .icon; delay: 100;">
              <a target = "_new" uk-tooltip = "PA League Discord" className = "icon uk-display-inline uk-button" href = "https://discord.gabirmotors.com/"><span className = "icon-button icon-button-discord" uk-icon = "icon:discord; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "PA Twitch" className = "icon uk-display-inline uk-button" href = "https://www.twitch.tv/pennyarcade"><span className = "icon-button icon-button-twitch" uk-icon = "icon:twitch; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "@GabirMotors" className = "icon uk-display-inline uk-button" href = "https://twitter.com/GabirMotors"><span className = "icon-button icon-button-twitter" uk-icon = "icon:twitter; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "@FleischwolfNews" className = "icon uk-display-inline uk-button" href = "https://twitter.com/FleischwolfNews"><span className = "icon-button icon-button-twitter" uk-icon = "icon:twitter; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <a target = "_new" uk-tooltip = "GM Merch" className = "icon uk-display-inline uk-button" href = "https://store.penny-arcade.com/collections/gabir-motors"><span className = "icon-button icon-button-store" uk-icon = "icon:bag; ratio: 1.4"></span></a>&nbsp;&nbsp;
              <ShareButton />
            </li>
            <li uk-scrollspy="cls: uk-animation-slide-left-medium; target: .uk-text-uppercase; delay: 100;">
              <p className = "uk-margin-top uk-text-uppercase uk-text-top">Made by<br /><span style = {{color:'white'}}>Gabe Krahulik</span><br/><a target = "_new" href="https://github.com/Lilspartan/"><span className = "icon-button icon-button-github" uk-icon = "github"></span></a> <a target = "_new" href="https://twitter.com/gabekrahulik"><span className = "icon-button icon-button-twitter" uk-icon = "twitter"></span></a></p>
            </li>
            <li className="uk-nav-divider"></li>
            <a className = "uk-button uk-button-link" href = "mailto:gabirmotors@gmail.com" target = "_new">Report a Problem</a>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default withRouter(Header);