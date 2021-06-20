/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import Header from "../../Header";
import { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom'
import qs from 'qs';

type Props = {
    location: lTypes;
}

type lTypes = {
    hash: string;
}

const Tutorial = (props:Props) => {
    const { location } = props;

    var tutorials = [
        "Tutorials",
        "Blue Flags",
        "Advanced Blue Flags",
        "Black Flags",
    ]
    
    var clicked = 0;

    setTimeout(function() {
        tutorials.forEach(target => {
            if (qs.parse(location.hash, { ignoreQueryPrefix: true })[`#${target.replace(/\s/g, '-').toLowerCase()}`] !== undefined && clicked === 0) {
                clicked = 1;
                (document.getElementById(target.replace(/\s/g, '-').toLowerCase()) as HTMLInputElement).click();
            }
        })
    }, 100)

    return (
        <>
            <Header
                title={`Gabir Motors | Tutorials`}
            />

            <div className="uk-height-large uk-background-cover uk-light uk-flex uk-background-cover uk-background-fixed" style={{ backgroundImage: 'url(img/gabir_bg.jpg)', minHeight: '100vh', height: 'auto' }}>
                <div>
                    <div className="article-header">
                        <ul className="uk-tab-top" uk-tab="connect: #component-tab-left; animation: uk-animation-fade">
                            {tutorials.map(t => (
                                <li><a href = "#" id={t.replace(/\s/g, '-').toLowerCase()}>{t}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="">
                        <ul id="component-tab-left" className="uk-switcher">
                            <li>
                                <article className="tutorial-article uk-align-center">
                                    <h1>PA League Tutorials</h1>

                                    <h2>What is This Page?</h2>
                                    <p>
                                        On this page, you'll be able to find in depth answers to some more complex questions, such as "What is a blue flag", "what do i do if given a black flag", etc.
                                    </p>

                                    <h2>How do I Find These Tutorials?</h2>
                                    <p>
                                        If you haven't noticed already, there are tabs at the top of the page, each of which is a different tutorial, you can also click <a href = "#blue-flags">here</a> or swipe (on mobile) to get started.
                                    </p>
                                </article>
                            </li>
                            <li>
                                <article className = "tutorial-article uk-align-center">
                                    <h1>Everything Blue Flags</h1>
                                    <span className = "uk-text-italic timestamp">Edited 6/18/21</span>

                                    <h2>What is a Blue Flag?</h2>
                                    <p>
                                        In auto racing, the Blue Flag (with the yellow diagonal stripe) informs a driver that they are being caught by a faster car and are about to be lapped. Blue flags generally come out when the faster car is within about 2 seconds of the car that’s about to be lapped. 
                                    </p>

                                    <h2>How do I know I’ve been given a Blue Flag?</h2>
                                    <p>
                                        In iRacing a Blue Flag icon will be shown by default towards the top left hand corner of your display. The Crew chief audio (aka Carl) will also tell you “They’re showing us the Blue Flag.” (You can move the flag in your layout using ALT-K and dragging it into a more prominent position.)
                                    </p>

                                    <h2>What must I do if I am shown the Blue Flag?</h2>
                                    <ul className = "uk-list">
                                        <li>
                                            <span className = "uk-text-danger uk-text-bold">NEVER</span> fight with a lapping car when you receive the Blue Flag. It is not a battle for position.
                                        </li>
                                        <li>
                                            <span className = "uk-text-success uk-text-bold">ALWAYS</span> keep an eye on your Relative <kbd>F3</kbd> to be aware of cars around you.
                                        </li>
                                        <li>
                                            <span className = "uk-text-success uk-text-bold">ALWAYS</span> drive in a predictable manner. Ideally you should be making it very clear what you are doing with smooth inputs (opening a gap, moving offline, lifting to facilitate the pass etc.) The default “PASS LEFT/PASS RIGHT button bindings or a friendly radio message can help a lot.
                                        </li>
                                        <li>
                                            <span className = "uk-text-danger uk-text-bold">NEVER</span> make a sudden move at the last moment. If you’re surprised by a Blue Flag situation, don’t panic. Just carry on steady and come up with a plan, or let the pass happen as safely as possible if the passing car is already alongside.
                                        </li>
                                        <li>
                                            <span className = "uk-text-warning uk-text-bold">ADVANCED TECHNIQUE</span> With experience, you’ll be able to manage faster traffic by finding the best opportunities that allow the pass to happen with a minimum of time lost for you and the overtaking driver. (Going extra deep into a hairpin to open the gap and thus having a bit more speed down the following straight is a good example.)
                                        </li>
                                    </ul>

                                    <h2>What other advice do you have for when I’ve been given a Blue Flag?</h2>
                                    <ul className = "uk-list">
                                        <li>
                                            1. If in doubt, stay on the racing line, particularly if it’s a multiclass race and the overtaking car is inherently quicker. Remember if you’re both in the same cars, acceleration curves are basically identical, and staying on line can turn the slower driver into a moving road block. 
                                        </li>
                                        <li>
                                            2. Ease up on the throttle to allow a clean pass on the straightaway--it’s best to communicate this ahead of time, or to move off line before reducing acceleration so you don’t get rear-ended if the car behind is using you as a draft.
                                        </li>
                                        <li>
                                            3. In road racing, the majority of passes happen in the braking zones, and that’s true for Blue Flag passes as well. If you’re on line and the overtaking car is on the inside, remember that they’ll probably brake a tad earlier than normal to make the corner with the non-optimal entry. Anticipate this by dragging your brake a tad earlier as well to leave room at the apex.
                                        </li>
                                        <li>
                                            4. A bit of information goes a very long way. Utilise the radio to verbally communicate with the lapping driver, brief clear messages are best. (“Pass Right,” “Lifting,” are great examples. “Get near me and we’re both getting on the express train to wallsville” is less helpful.)
                                        </li>
                                    </ul>
                                </article>
                            </li>
                            <li>
                                <article className = "tutorial-article">
                                    <h1>Advanced Everything Blue Flags</h1>
                                    <span className = "uk-text-italic timestamp">Edited 6/18/21</span>

                                    <h2>What should I do if I am shown the Blue Flag?</h2>
                                    <ul className = "uk-list">
                                        <li>
                                            <span className = "uk-text-bold uk-text-primary">ROAD</span> Single Class: If in doubt stay on your normal racing line and let the faster car choose how and where to make the pass. If you feel more comfortable you can consider yielding the line to the faster driver by making a slower, much later entry to a corner or by pulling off line on a straight and briefly lifting off the throttle to facilitate the pass. Use your Relative <kbd>F3</kbd> to be aware if there is more than one car making a pass.
                                        </li>
                                        <li>
                                            <span className = "uk-text-bold uk-text-primary">ROAD</span> Multi-class: If in doubt stay on your normal line and let the faster car (especially if a faster class) choose how and where to make the pass. If you feel more comfortable you can consider yielding the line to the faster driver by making a slower, much later entry to a corner or by pulling off line on a straight and briefly lifting off the throttle to facilitate the pass. Use your Relative <kbd>F3</kbd> to be aware if there is more than one car making a pass.
                                        </li>
                                        <li>
                                            <span className = "uk-text-bold uk-text-primary">OVAL</span> If in doubt stay on your normal line and let the faster car (especially if a faster class) choose how and where to make the pass. If you feel more comfortable you can consider yielding the line to the faster driver by making a slower, much later entry to a corner or by pulling off line on a straight and briefly lifting off the throttle to facilitate the pass. Use your Relative <kbd>F3</kbd> to be aware if there is more than one car making a pass.
                                        </li>
                                    </ul>

                                    <h2>What should I expect if I don’t yield to a lapping car?</h2>
                                    <ul className = "uk-list">
                                        <li>
                                            <span className = "uk-text-bold uk-text-primary">ROAD</span> Single Class: Expect the passing driver to use light flashes (if available) to ‘insist’ on you facilitating the pass. After several flashes (usually about a lap or so depending on the speed difference) expect a forceful pass attempt.
                                        </li>
                                        <li>
                                            <span className = "uk-text-bold uk-text-primary">ROAD</span> Multi-class: Same as above but if the car is a faster class expect the flashes immediately as a warning and the forced pass to come much sooner.
                                        </li>
                                        <li>
                                            <span className = "uk-text-bold uk-text-primary">OVAL</span> Expect the passing driver to tailgate. Within a lap or so expect to be lightly bumped to encourage you to move off line. If you still do not or cannot yield expect a more forceful bump. If a third bump is required expect it to be the last bump before the one against the wall.
                                        </li>
                                    </ul>
                                </article>
                            </li>
                            <li>
                                <article className = "tutorial-article">
                                    <h1>Everything Black Flags</h1>
                                    <span className = "uk-text-italic timestamp">Edited 6/19/21</span>

                                    <h2>What is a Black Flag?</h2>
                                    <p>
                                        In auto racing, the Black Flag means the racing driver has a penalty for a rules infraction. This infraction can be a one time event or an accumulation of multiple, smaller events.
                                    </p>

                                    <h2>How do I know I’ve been given a Black Flag?</h2>
                                    <p>
                                        In iRacing a Black Flag icon will be shown by default towards the top left hand corner of your display. The Crew chief audio (aka Carl) will also tell you “They’re showing us the Black Flag”. (You can move the flag in your layout using <kbd>ALT + K</kbd> and dragging it into a more prominent position.) 
                                    </p>

                                    <h2>What must I do if I am shown the Black Flag?</h2>
                                    <p>
                                        If you are shown the Black Flag you will have to serve a Penalty depending on the severity of the incident. The info box towards the top of your display will have details on the penalty, read the instructions. 
                                    </p>
                                    <p>
                                        It might be a drive-through penalty (drive through the pits, observing the pit speed limit under Green Flag conditions (not under a Yellow Caution Flag)), or a stop-and-go or timed stop (drive into pits, stop in your pit spot and stay there until the penalty time is served).  The penalty <strong>must</strong> be served <i>within the next 3 laps</i> or you will be <strong>disqualified</strong> from the race by the iRacing system.
                                    </p>

                                    <h2>Why have I been given a Black Flag?</h2>
                                    <p>
                                        There are numerous ways to get a Black Flag. The most common ways are:
                                    </p>
                                    <ul className = "uk-list">
                                        <li>
                                            Speeding in the pit lane    
                                        </li>
                                        <li>
                                            Entering a closed pit (sometimes unavoidable due to damage in oval racing, a penalty will be assessed if you must pit for repairs under a closed up)
                                        </li>
                                        <li>
                                            Unsafe pit exit (moving onto the race track before passing the blue cone/crossing the solid pit exit line)
                                        </li>
                                        <li>
                                            Accumulation of ‘incident points’ from offs, loss of control (spins) or contact (with walls or other cars). In most races the penalty point is 17 incidents but the threshold can vary
                                        </li>
                                        <li>
                                            Not giving back the time within a certain time (15 seconds)  when a Slowdown penalty is issued after cutting the course
                                        </li>
                                    </ul>

                                    <h2>What happens if I don’t serve my Black Flag?</h2>
                                    <p>If you don’t serve your Black Flag penalty within the 3 laps you will be Disqualified and removed from the race.</p>
                                </article>
                            </li>    
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default withRouter(Tutorial)
