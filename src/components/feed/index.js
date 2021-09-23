import "./feed.css"
import "../../css/user_profile.css";
import React from "react";
import PropTypes from "prop-types";
import BannerImage from "../../images/banner-img.png";
import Jorja from "../../images/jorja.png";
import Klaus from "../../images/klaus.png";
import CarProfile from "../../images/car-profile.png";
import TreeProfile from "../../images/tree-profile.png";

import VerifiedTag from "../../images/verified-tag.png";
import like from "../../images/like.png";
import Send from "../../images/send-message2.png";
import Upload from "../../images/upload-image2.png";
import Question from "../../images/question.png";
import CodeSnippet from "../../images/code-snippet.png";
import AddWhite from "../../images/add-white2.png";
import PostImage from "../../images/post-image.png";

import { API_ENDPOINT } from "../../pages/url"
import notLike from "../../images/not_like.png"
import comment from "../../images/comments.png";
import moment from "moment";
import Code from "../../images/code.svg";
import { useState, useEffect, useContext } from "react"
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Link, useParams, withRouter } from "react-router-dom";
import { useTitle } from "../../utils/title";
import injectSheet from "react-jss";
import { StyleSheet } from "../../utils/shimmer";
import CustomShimmer from "../shimmerComp";
import InfoBar from "../info";
import LiveLogo from "../../images/livegists_logo.png";
import { themeContext } from "../../App";

const FeedComponent = () => {

    const code = String.raw
        `body {
    background - color: #FFFFFF;
    color: #000000;
    grid-template-columns: 270px 1fr;
    max-width: 100vw;
    ...
};
    `
    return <>
        <main className="feed-main">
            <section className="feed-body">
                <section className="banner-container">
                    <h3>Welcome to Feed!</h3>
                    <hr />
                    <img src={BannerImage} alt="banner" />
                    <p className="banner-message">Hope you can see other users' gists code snippets, featured people and lots more. Enjoy!</p>
                    <span>DISMISS</span>
                </section>
                <section className="create-post">
                    <img src={Jorja} />
                    <div className="text-editor">
                        <div id="add-badge">Add badge</div>
                        <div id="message-wrap">
                            <textarea placeholder="Write something..."></textarea>
                            <div id="send-circle">
                                <img src={Send} id="send-img" />
                            </div>
                        </div>
                        <div id="insert-object">
                            <span style={{ "background-color": "#478E0E" }}>
                                <img src={Upload} />
                                Image
                            </span>
                            <span style={{ "background-color": "#B70A0A" }}>
                                <img src={CodeSnippet} />
                                Code Snippet
                            </span>
                            <span style={{ "background-color": "#0B6287" }}>
                                <img src={Question} />
                                Question
                            </span>
                            <span style={{ "background-color": "#000000" }}>
                                <img src={AddWhite} />
                                Create Gist
                            </span>
                        </div>
                    </div>
                </section>

                <section className="post code-snippet">
                    <div className="post-head">
                        <img src={Klaus} />
                        <div className="post-user-info">
                            <div>
                                <span className="post-username">Regedit</span>
                                <img src={VerifiedTag} />
                                <span className="post-email">efunsanyaayo...</span>
                            </div>
                            <div className="post-timestamp">4th Sept. 2021</div>
                        </div>
                    </div>
                    <span className="post-desc">Posted a code snippet</span>
                    <div className="post-main">
                        <div className="code-post">
                            <pre>
                                {code}
                            </pre>
                            <Link className="view-full">View full code...</Link>
                        </div>
                    </div>
                    <div className="post-actions">
                        <div><img src={like} /> 21</div>
                        <div><img src={comment} /> 15</div>
                    </div>
                </section>

                <section className="post image">
                    <div className="post-head">
                        <img src={Klaus} />
                        <div className="post-user-info">
                            <div>
                                <span className="post-username">Regedit</span>
                                <img src={VerifiedTag} />
                                <span className="post-email">efunsanyaayo...</span>
                            </div>
                            <div className="post-timestamp">4th Sept. 2021</div>
                        </div>
                    </div>
                    <span className="post-desc">Posted a picture</span>
                    <div className="post-main">
                        <div className="post-description">
                            So, all UX designers – juniors and seniors alike – need a UX portfolio.
                            Though putting one together might seem like a huge task, once you get an
                            idea of what makes a great portfolio it’ll come easy.
                            And the fastest way to get that idea is to look up inspiration.
                        </div>
                        <img src={PostImage} className="post-image" />
                    </div>
                    <div className="post-actions">
                        <div><img src={like} /> 21</div>
                        <div><img src={comment} /> 15</div>
                    </div>
                </section>

                <section className="post article">
                    <div className="post-head">
                        <img src={Klaus} />
                        <div className="post-user-info">
                            <div>
                                <span className="post-username">Regedit</span>
                                <img src={VerifiedTag} />
                                <span className="post-email">efunsanyaayo...</span>
                            </div>
                            <div className="post-timestamp">4th Sept. 2021</div>
                        </div>
                    </div>
                    <span className="post-desc">Posted a picture</span>
                    <div className="post-main">
                        <h3 className="post-title">Who are UI/UX Designers?</h3>
                        <div className="post-description">
                            So, all UX designers – juniors and seniors alike – need a UX portfolio.
                            Though putting one together might seem like a huge task, once you get an
                            idea of what makes a great portfolio it’ll come easy.
                            And the fastest way to get that idea is to look up inspiration.
                        </div>
                        <Link className="view-full">View full article...</Link>
                    </div>
                    <div className="post-actions">
                        <div><img src={like} /> 21</div>
                        <div><img src={comment} /> 15</div>
                    </div>
                </section>

                <section className="post article">
                    <div className="post-head">
                        <img src={Klaus} />
                        <div className="post-user-info">
                            <div>
                                <span className="post-username">Regedit</span>
                                <img src={VerifiedTag} />
                                <span className="post-email">efunsanyaayo...</span>
                            </div>
                            <div className="post-timestamp">4th Sept. 2021</div>
                        </div>
                    </div>
                    <span className="post-desc">Posted a picture</span>
                    <div className="post-main">
                        <h3 className="post-title">Who are UI/UX Designers?</h3>
                        <div className="post-description">
                            So, all UX designers – juniors and seniors alike – need a UX portfolio. Though putting one together might seem like a huge task, once you get an idea of what makes a great portfolio it’ll come easy. And the fastest way to get that idea is to look up inspiration.
                            User Interface Design is a crucial subset of UX. They both share the same end goal—to provide a positive experience for the user—but UI Design comprises an entirely separate leg of the journey.
                            Put simply, UI is what you use to interact with a product, while UX is concerned with how this overall interaction feels. We’ve already written extensively about the differences between user experience (UX) and user interface (UI) design, so from now on we’ll focus solely on UI. If, after reading all about the role of a UI designer, you feel inclined to become one, be sure to move gracefully over to senior UI designer Eric Bieller’s step-by-step guide on how to do exactly that, or watch the video tutorial below in which UI design mentor Elizé gives you a hands-on, practical introduction to the world of user interface design. To access all her tutorials, simply sign up here, or subscribe to the CareerFoundry YouTube channel.
                            So, all UX designers – juniors and seniors alike – need a UX portfolio. Though putting one together might seem like a huge task, once you get an idea of what makes a great portfolio it’ll come easy. And the fastest way to get that idea is to look up inspiration. User Interface Design is a crucial subset of UX. They both share the same end goal.
                        </div>
                    </div>
                    <div className="post-actions">
                        <div><img src={like} /> 21</div>
                        <div><img src={comment} /> 15</div>
                    </div>
                </section>

                <section className="post question">
                    <div className="post-head">
                        <img src={Klaus} />
                        <div className="post-user-info">
                            <div>
                                <span className="post-username">Regedit</span>
                                <img src={VerifiedTag} />
                                <span className="post-email">efunsanyaayo...</span>
                            </div>
                            <div className="post-timestamp">4th Sept. 2021</div>
                        </div>
                    </div>
                    <span className="post-desc">Posted a question</span>
                    <div className="post-main">
                        <div className="post-description">
                            How do I fix this bug? I've been working on it for hours!
                        </div>
                        <div className="code-post">
                            <pre>
                                {code}
                            </pre>
                            <Link className="view-full">View full code...</Link>
                        </div>
                    </div>
                    <div className="post-actions">
                        <div><img src={like} /> 21</div>
                        <div><img src={comment} /> 15</div>
                    </div>
                </section>

            </section>
            <aside className="feed-aside">
                <div className="featured-people">
                    <h3>Featured People</h3>
                    <div className="user-accounts">
                        <div className="user-account">
                            <img src={Klaus} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Regedit</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">efunsanyaayo...</span>
                                </div>
                                <div className="user-account-desc">Frontend and Backend Dev...</div>
                            </div>
                            <div className="follow yes">Following</div>
                        </div>

                        <div className="user-account">
                            <img src={CarProfile} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Izzy Graphix</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">muizsan...</span>
                                </div>
                                <div className="user-account-desc">UI/UX Designer</div>
                            </div>
                            <div className="follow no">Follow</div>
                        </div>

                        <div className="user-account">
                            <img src={TreeProfile} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Gypsy Temi</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">emperor...</span>
                                </div>
                                <div className="user-account-desc">Web Developer</div>
                            </div>
                            <div className="follow yes">Following</div>
                        </div>

                        <div className="user-account">
                            <img src={Klaus} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Regedit</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">efunsanyaayo...</span>
                                </div>
                                <div className="user-account-desc">Frontend and Backend Dev...</div>
                            </div>
                            <div className="follow no">Follow</div>
                        </div>

                        <div className="user-account">
                            <img src={Klaus} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Regedit</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">efunsanyaayo...</span>
                                </div>
                                <div className="user-account-desc">Frontend and Backend Dev...</div>
                            </div>
                            <div className="follow yes">Following</div>
                        </div>
                    </div>
                </div>


                <div className="recently-joined">
                    <h3>Recently Joined</h3>
                    <div className="user-accounts">
                        <div className="user-account">
                            <img src={Klaus} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Regedit</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">efunsanyaayo...</span>
                                </div>
                                <div className="user-account-desc">Frontend and Backend Dev...</div>
                            </div>
                            <div className="follow no">Follow</div>
                        </div>

                        <div className="user-account">
                            <img src={CarProfile} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Izzy Graphix</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">muizsan...</span>
                                </div>
                                <div className="user-account-desc">UI/UX Designer</div>
                            </div>
                            <div className="follow yes">Following</div>
                        </div>

                        <div className="user-account">
                            <img src={TreeProfile} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Gypsy Temi</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">emperor...</span>
                                </div>
                                <div className="user-account-desc">Web Developer</div>
                            </div>
                            <div className="follow yes">Following</div>
                        </div>

                        <div className="user-account">
                            <img src={Klaus} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Regedit</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">efunsanyaayo...</span>
                                </div>
                                <div className="user-account-desc">Frontend and Backend Dev...</div>
                            </div>
                            <div className="follow yes">Following</div>
                        </div>

                        <div className="user-account">
                            <img src={Klaus} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Regedit</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">efunsanyaayo...</span>
                                </div>
                                <div className="user-account-desc">Frontend and Backend Dev...</div>
                            </div>
                            <div className="follow no">Follow</div>
                        </div>
                    </div>
                </div>


                <div className="top-gist-makers">
                    <h3>Top Gistmakers</h3>
                    <div className="user-accounts">
                        <div className="user-account">
                            <img src={Klaus} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Regedit</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">efunsanyaayo...</span>
                                </div>
                                <div className="user-account-desc">Frontend and Backend Dev...</div>
                            </div>
                            <div className="follow yes">Following</div>
                        </div>

                        <div className="user-account">
                            <img src={CarProfile} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Izzy Graphix</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">muizsan...</span>
                                </div>
                                <div className="user-account-desc">UI/UX Designer</div>
                            </div>
                            <div className="follow yes">Following</div>
                        </div>

                        <div className="user-account">
                            <img src={TreeProfile} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Gypsy Temi</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">emperor...</span>
                                </div>
                                <div className="user-account-desc">Web Developer</div>
                            </div>
                            <div className="follow yes">Following</div>
                        </div>

                        <div className="user-account">
                            <img src={Klaus} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Regedit</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">efunsanyaayo...</span>
                                </div>
                                <div className="user-account-desc">Frontend and Backend Dev...</div>
                            </div>
                            <div className="follow no">Follow</div>
                        </div>

                        <div className="user-account">
                            <img src={Klaus} />
                            <div className="user-account-info">
                                <div>
                                    <span className="user-account-username">Regedit</span>
                                    <img src={VerifiedTag} />
                                    <span className="user-account-email">efunsanyaayo...</span>
                                </div>
                                <div className="user-account-desc">Frontend and Backend Dev...</div>
                            </div>
                            <div className="follow no">Follow</div>
                        </div>
                    </div>
                </div>
            </aside>
        </main>
    </>
}

export default withRouter(injectSheet(StyleSheet)(FeedComponent));