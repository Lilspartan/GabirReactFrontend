import Header from '../components/Header';
import { withRouter } from 'react-router-dom';

const TwitchSignIn = () => {
    return (
        <>
            <Header title = "Gabir Motors | Sign In With Twitch" />
            <div className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover" style={{backgroundImage: 'url(img/gabir_bg.jpg)', height: '100vh'}}>

                <div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical uk-animation-slide-top-small uk-container">
                    <div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-secondary uk-card-body uk-box-shadow-large">
                        
                        <h1>Sign in to vote</h1>
                        <div className="uk-margin">
                            <a href='https://id.twitch.tv/oauth2/authorize?client_id=6gfpjegdkmcmepffbvh4vfp8s9vd13&redirect_uri=https://gabirmotors.com/vote&response_type=token+id_token&scope=user:read:email+openid&claims={ "id_token": { "email": null, "email_verified": null }, "userinfo": { "picture": null, "email": null } }' className = "uk-button uk-button-primary" style = {{ backgroundColor: '#6441a5', color: 'white' }}>Sign in with <span uk-icon = "icon:twitch; ratio: 1.4"></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(TwitchSignIn);
