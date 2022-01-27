const ShareButton = () => {
    const handleClick = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: `Gabir Motors`,
                    text: `Check out Gabir Motors`,
                    url: document.location.href,
                })
                .then(() => {
                    console.log('Successfully shared');
                })
                .catch(error => {
                    console.error('Something went wrong sharing the blog', error);
                });
        }
    }

    return (
        <>
            <a onClick = {handleClick} uk-tooltip = "Share" className = "icon uk-display-inline uk-button" href = "#share"><span className = "icon-button icon-button-share" uk-icon = "icon:social; ratio: 1.4"></span></a>&nbsp;&nbsp;
        </>
    )
}

export default ShareButton
