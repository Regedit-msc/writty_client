import { Link, withRouter } from "react-router-dom"
import "./languages.css";
import "../../css/main.css";
import Logo from "../../images/css-logo.png";

const LangCSS = () => {
    return <>
        <div className="lang-wrapper">
            <div className="lang-left-col">
                <div className="lang-left-bar">
                    <div>
                        <img src={Logo} className="" />
                    </div>
                </div>
            </div>
            <div className="lang-main-col">
                <div className="lang-back-div">
                    <Link href="/home" className="lang-back">BACK</Link>
                </div>
                <h3 className="lang-head"><span>What is C</span>SS?</h3>
                <div>
                    <p>
                        Cascading Style Sheets, fondly referred to as CSS, is a simple design language intended to simplify the
                        process of making web pages presentable.
                        CSS handles the look and feel part of a web page. Using CSS, you can control the color of the text, the
                        style of fonts, the spacing between paragraphs, how columns are sized and laid out, what background
                        images or colors are used, layout designs, variations in display for different devices and screen sizes
                        as well as a variety of other effects.
                        CSS is easy to learn and understand but it provides powerful control over the presentation of an HTML
                        document. Most commonly, CSS is combined with the markup languages HTML or XHTML.
                    </p>
                    <h4 className="lang-sub-head"> More Info </h4>
                    <p>
                        CSS3 is the latest version of the CSS specification. CSS3 adds several new styling features and
                        improvements to enhance the web presentation capabilities.
                    </p>
                </div>
                <div>Try running some CSS code here... 👇</div>
                <div className="code-block"></div>
                <Link href="#" className="lang-read-more">Read more about CSS...</Link>
            </div>
        </div>

    </>
}

export default LangCSS;