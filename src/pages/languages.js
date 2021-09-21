import { Link, withRouter } from "react-router-dom"
import { useParams } from "react-router-dom";
import { themeContext } from "../App";
import { useContext } from "react";
import "../css/languages.css";
// import { API_ENDPOINT } from "./url";
// import { themeContext } from "../App";
// import { useContext, useState, useEffect } from "react";
// import { userContext } from "../contexts/userContext";
// import InfoBar from "../components/info";

import CSSLogo from "../images/css-logo.png";
import DartLogo from "../images/dart-logo.png";
import HTMLLogo from "../images/html-logo.png";
import JavaLogo from "../images/java-logo.png";
import JavaScriptLogo from "../images/javascript-logo.png";
import JSONLogo from "../images/json-logo.png";
import JSXLogo from "../images/jsx-logo.png";
import PythonLogo from "../images/python-logo.png";
import { useTitle } from "../utils/title";


const Languages = ({history}) => {
    const { theme } = useContext(themeContext);
    const { language } = useParams();
 useTitle(`Language-${language}`);

    switch (language) {
        case "css":
            let sideColorCSS = { "--bar-clr": "#1693D1" };
           
            return (
                <>
                    <div className={theme === "light" ? "lang-wrapper_light" : "lang-wrapper"} style={sideColorCSS}>
                        <div className="lang-left-col">
                            <div className={theme === "light" ? "lang-left-bar_light" : "lang-left-bar"}>
                                <div>
                                    <img src={CSSLogo} alt="css logo" />
                                </div>
                            </div>
                        </div>
                        <div className="lang-main-col">
                            <div className="lang-back-div">
                                <Link to="#" onClick={()=> history.goBack()}  className={theme === "light" ? "lang-back_light" : "lang-back"}>BACK</Link>
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
                            <Link to="https://css-tricks.com/" className={theme === "light" ? "lang-read-more_light" : "lang-read-more"}>Read more about CSS...</Link>
                        </div>
                    </div>
                </>
            )

        case "dart":
            let sideColorDart = { "--bar-clr": "#2BB6F6" };
          
            return (
                <>
                    <div className={theme === "light" ? "lang-wrapper_light" : "lang-wrapper"} style={sideColorDart}>
                        <div className="lang-left-col">
                            <div className={theme === "light" ? "lang-left-bar_light" : "lang-left-bar"}>
                                <div>
                                    <img src={DartLogo} alt="dart logo" />
                                </div>
                            </div>
                        </div>
                        <div className="lang-main-col">
                            <div className="lang-back-div">
                                <Link to="#" onClick={()=> history.goBack()} className={theme === "light" ? "lang-back_light" : "lang-back"}>BACK</Link>
                            </div>
                            <h3 className="lang-head"><span>What is D</span>art?</h3>
                            <div>
                                <p>
                                    Dart is a client-optimized language for developing fast apps on any platform. Its goal is to offer the
                                    most productive programming language for multi-platform development, paired with a flexible execution
                                    runtime platform for app frameworks.
                                </p>
                                <p>
                                    Languages are defined by their technical envelope — the choices made during development that shape the
                                    capabilities and strengths of a language. Dart is designed for a technical envelope that is particularly
                                    suited to client development, prioritizing both development (sub-second stateful hot reload) and
                                    high-quality production experiences across a wide variety of compilation targets (web, mobile, and
                                    desktop).
                                </p>
                                <h4 className="lang-sub-head"> More Info </h4>
                                <p>
                                    The Flutter framework is a popular, multi-platform UI toolkit that’s powered by the Dart platform, and
                                    that provides tooling and UI libraries to build UI experiences that run on iOS, Android, macOS, Windows,
                                    Linux, and the web.
                                </p>
                            </div>
                            <div>Try running some Dart code here... 👇</div>
                            <div className="code-block"></div>
                            <Link to={{ pathname: "https://dart.dev/overview" }} target="_blank" className={theme === "light" ? "lang-read-more_light" : "lang-read-more"}>Read more about Dart...</Link>
                        </div>
                    </div>
                </>
            )

        case "html":
            let sideColorHTML = { "--bar-clr": "#F3642C" };
           
            return (
                <>
                    <div className={theme === "light" ? "lang-wrapper_light" : "lang-wrapper"} style={sideColorHTML}>
                        <div className="lang-left-col">
                            <div className={theme === "light" ? "lang-left-bar_light" : "lang-left-bar"}>
                                <div>
                                    <img src={HTMLLogo} alt="html logo" />
                                </div>
                            </div>
                        </div>
                        <div className="lang-main-col">
                            <div className="lang-back-div">
                                <Link to="#" onClick={()=> history.goBack()} className={theme === "light" ? "lang-back_light" : "lang-back"}>BACK</Link>
                            </div>
                            <h3 className="lang-head"><span>What is H</span>TML?</h3>
                            <div>
                                <p>
                                    HTML stands for Hypertext Markup Language, and it is the most widely used language to write Web
                                    Pages.<br />
                                    Hypertext refers to the way in which Web pages (HTML documents) are linked together. Thus, the link
                                    available on a webpage is called Hypertext.<br />
                                    As its name suggests, HTML is a Markup Language which means you use HTML to simply "mark-up" a text
                                    document with tags that tell a Web browser how to structure it to display.
                                    <p>
                                        Originally, HTML was developed with the intent of defining the structure of documents like headings,
                                        paragraphs, lists, and so forth to facilitate the sharing of scientific information between
                                        researchers.<br />
                                        Now, HTML is being widely used to format web pages with the help of different tags available in HTML
                                        language.
                                    </p>
                                </p>
                                <h4 className="lang-sub-head"> More Info </h4>
                                <p>
                                    HTML It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages
                                    such as JavaScript.
                                    HTML can embed programs written in a scripting language such as JavaScript, which affects the behavior
                                    and content of web pages. Inclusion of CSS defines the look and layout of content. The World Wide Web
                                    Consortium (W3C), former maintainer of the HTML and current maintainer of the CSS standards, has
                                    encouraged the use of CSS over explicit presentational HTML since 1997.

                                    <p>
                                        HTML5 is the latest specification of the HTML language, and represented a major break with previous
                                        markup practices. The purpose of the profound changes to the language was to standardize the many new
                                        ways in which developers were using it, as well as to encourage a single set of best practices with
                                        regards to web development.
                                    </p>
                                </p>
                            </div>
                            <div>Try running some HTML code here... 👇</div>
                            <div className="code-block"></div>
                            <Link to={{ pathname: "https://html.com/html5/#ixzz72XVLQOTF" }} target="_blank" className={theme === "light" ? "lang-read-more_light" : "lang-read-more"}>Read more about HTML...</Link>
                        </div>
                    </div>
                </>
            )

        case "java":
            let sideColorJava = { "--bar-clr": "#FF0C0E" };
        
            return (
                <>
                    <div className={theme === "light" ? "lang-wrapper_light" : "lang-wrapper"} style={sideColorJava}>
                        <div className="lang-left-col">
                            <div className={theme === "light" ? "lang-left-bar_light" : "lang-left-bar"}>
                                <div>
                                    <img src={JavaLogo} alt="java logo" />
                                </div>
                            </div>
                        </div>
                        <div className="lang-main-col">
                            <div className="lang-back-div">
                                <Link to="#" onClick={()=> history.goBack()} className={theme === "light" ? "lang-back_light" : "lang-back"}>BACK</Link>
                            </div>
                            <h3 className="lang-head"><span>What is J</span>ava?</h3>
                            <div>
                                <p>
                                    Java is one of the world's most widely used computer language. Java is a simple, general-purpose,
                                    object-oriented, interpreted, robust, secure, architecture-neutral, portable, high-performance,
                                    multithreaded computer language. It is intended to let application developers "write once, run anywhere"
                                    (WORA), meaning that code that runs on one platform does not need to be recompiled to run on another.
                                </p>
                                <p>
                                    Java is a programming language and computing platform first released by Sun Microsystems in 1995. Java
                                    is a programming language built for the age of the Internet. There are lots of applications and websites
                                    that will not work unless you have Java installed, and more are created every day. Java is fast, secure,
                                    and reliable. From laptops to datacenters, game consoles to scientific supercomputers, cell phones to
                                    the Internet, Java is everywhere!
                                </p>
                                <h4 className="lang-sub-head"> More Info </h4>
                                <p>
                                    Java solves a host of problems software developers encounter, and very easily too!

                                    <ul>
                                        <li>Your Java programming language is object oriented, yet it's still dead simple. </li>
                                        <li>Your development cycle is much faster because Java technology is interpreted. The
                                            compile-link-load-test-crash-debug cycle is obsolete--now you just compile and run.</li>
                                        <li>Your applications are portable across multiple platforms. Write your applications once, and you
                                            never
                                            need to port them--they will run without modification on multiple operating systems and hardware
                                            architectures.</li>
                                        <li>Your applications are robust because the Java runtime environment manages memory for you.</li>
                                        <li>Your interactive graphical applications have high performance because multiple concurrent threads of
                                            activity in your application are supported by the multithreading built into the Java programming
                                            language and runtime platform.</li>
                                        <li>Your applications are adaptable to changing environments because you can dynamically download code
                                            modules from anywhere on the network.</li>
                                        <li>Your end users can trust that your applications are secure, even though they're downloading code
                                            from
                                            all over the Internet; the Java runtime environment has built-in protection against viruses and
                                            tampering.</li>
                                    </ul>
                                </p>
                            </div>
                            <div>Try running some Java code here... 👇</div>
                            <div className="code-block"></div>
                            <Link to={{ pathname: "https://www.oracle.com/java/" }} target="_blank" className={theme === "light" ? "lang-read-more_light" : "lang-read-more"}>Read more about Java...</Link>
                        </div>
                    </div>
                </>
            )

        case "javascript":
            let sideColorJavaScript = { "--bar-clr": "#FED73C" };
          
            return (
                <>
                    <div className={theme === "light" ? "lang-wrapper_light" : "lang-wrapper"} style={sideColorJavaScript}>
                        <div className="lang-left-col">
                            <div className={theme === "light" ? "lang-left-bar_light" : "lang-left-bar"}>
                                <div>
                                    <img src={JavaScriptLogo} alt="javascript logo" />
                                </div>
                            </div>
                        </div>
                        <div className="lang-main-col">
                            <div className="lang-back-div">
                                <Link to="#" onClick={()=> history.goBack()} className={theme === "light" ? "lang-back_light" : "lang-back"}>BACK</Link>
                            </div>
                            <h3 className="lang-head"><span>What is J</span>avaScript?</h3>
                            <div>
                                <p>
                                    JavaScript is a cross-platform, object-oriented scripting language used to make webpages interactive
                                    (e.g., having complex animations, clickable buttons, popup menus, etc.). There are also more advanced
                                    server side versions of JavaScript such as Node.js, which allow you to add more functionality to a
                                    website than downloading files (such as realtime collaboration between multiple computers). Inside a
                                    host environment (for example, a web browser), JavaScript can be connected to the objects of its
                                    environment to provide programmatic control over them.
                                </p>
                                <h4 className="lang-sub-head"> More Info </h4>
                                <p>
                                    JavaScript contains a standard library of objects, such as Array, Date, and Math, and a core set of
                                    language elements such as operators, control structures, and statements. Core JavaScript can be extended
                                    for a variety of purposes by supplementing it with additional objects; for example:

                                    <p>
                                        <b>Client-side JavaScript</b> extends the core language by supplying objects to control a browser and its
                                        Document Object Model (DOM). For example, client-side extensions allow an application to place elements
                                        on an HTML form and respond to user events such as mouse clicks, form input, and page navigation.<br />
                                        <b>Server-side JavaScript</b> extends the core language by supplying objects relevant to running JavaScript on
                                        a server. For example, server-side extensions allow an application to communicate with a database,
                                        provide continuity of information from one invocation to another of the application, or perform file
                                        manipulations on a server.
                                    </p>
                                </p>

                            </div>
                            <div>Try running some JavaScript code here... 👇</div>
                            <div className="code-block"></div>
                            <Link to={{ pathname: "https://www.javascript.com/" }} target="_blank" className={theme === "light" ? "lang-read-more_light" : "lang-read-more"}>Read more about JavaScript...</Link>
                        </div>
                    </div>
                </>
            )

        case "json":
            let sideColorJSON = { "--bar-clr": "#3A3A3A" };
          
            return (
                <>
                    <div className={theme === "light" ? "lang-wrapper_light" : "lang-wrapper"} style={sideColorJSON}>
                        <div className="lang-left-col">
                            <div className={theme === "light" ? "lang-left-bar_light" : "lang-left-bar"}>
                                <div>
                                    <img src={JSONLogo} alt="json logo" />
                                </div>
                            </div>
                        </div>
                        <div className="lang-main-col">
                            <div className="lang-back-div">
                                <Link to="#" onClick={()=> history.goBack()} className={theme === "light" ? "lang-back_light" : "lang-back"}>BACK</Link>
                            </div>
                            <h3 className="lang-head"><span>What is J</span>SON?</h3>
                            <div>
                                <p>
                                    JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based
                                    on JavaScript object syntax. It is commonly used for transmitting data in web applications (e.g.,
                                    sending some data from the server to the client, so it can be displayed on a web page, or vice versa).
                                    You'll come across it quite often, so in this article we give you all you need to work with JSON using
                                    JavaScript, including parsing JSON so you can access data within it, and creating JSON.
                                </p>
                                <h4 className="lang-sub-head"> More Info </h4>
                                <p>
                                    JSON is a text-based data format following JavaScript object syntax, which was popularized by Douglas
                                    Crockford. Even though it closely resembles JavaScript object literal syntax, it can be used
                                    independently from JavaScript, and many programming environments feature the ability to read (parse) and
                                    generate JSON.
                                    JSON exists as a string — useful when you want to transmit data across a network. It needs to be
                                    converted to a native JavaScript object when you want to access the data. This is not a big issue —
                                    JavaScript provides a global JSON object that has methods available for converting between the two.
                                    A JSON string can be stored in its own file, which is basically just a text file with an extension of
                                    .json, and a MIME type of application/json.
                                </p>

                            </div>
                            <div>Try running some JSON code here... 👇</div>
                            <div className="code-block"></div>
                            <Link to={{ pathname: "https://www.json.org/json-en.html" }} target="_blank" className={theme === "light" ? "lang-read-more_light" : "lang-read-more"}>Read more about JSON...</Link>
                        </div>
                    </div>
                </>
            )

        case "jsx":
            let sideColorJSX = { "--bar-clr": "#8A53A6" };
          
            return (
                <>
                    <div className={theme === "light" ? "lang-wrapper_light" : "lang-wrapper"} style={sideColorJSX}>
                        <div className="lang-left-col">
                            <div className={theme === "light" ? "lang-left-bar_light" : "lang-left-bar"}>
                                <div>
                                    <img src={JSXLogo} alt="jsx logo" />
                                </div>
                            </div>
                        </div>
                        <div className="lang-main-col">
                            <div className="lang-back-div">
                                <Link to="#" onClick={()=> history.goBack()}className={theme === "light" ? "lang-back_light" : "lang-back"}>BACK</Link>
                            </div>
                            <h3 className="lang-head"><span>What is J</span>SX?</h3>
                            <div>
                                <p>
                                    JSX is an XML/HTML-like syntax used by React that extends ECMAScript so that XML/HTML-like text can
                                    co-exist with JavaScript/React code. The syntax is intended to be used by preprocessors (i.e.,
                                    transpilers like Babel) to transform HTML-like text found in JavaScript files into standard JavaScript
                                    objects that a JavaScript engine will parse.
                                    <p>
                                        Basically, by using JSX you can write concise HTML/XML-like structures (e.g., DOM like tree structures)
                                        in the same file as you write JavaScript code, then Babel will transform these expressions into actual
                                        JavaScript code. Unlike the past, instead of putting JavaScript into HTML, JSX allows us to put HTML
                                        into JavaScript.
                                    </p>

                                </p>
                                <h4 className="lang-sub-head"> More Info </h4>
                                <p>
                                    <p>
                                        JSX is a syntax extension to JavaScript. We recommend using it with React to describe what the UI should
                                        look like. JSX may remind you of a template language, but it comes with the full power of
                                        JavaScript.<br />
                                        JSX produces React “elements”.
                                    </p>
                                    <p>
                                        React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are
                                        handled, how the state changes over time, and how the data is prepared for display.<br />

                                        Instead of artificially separating technologies by putting markup and logic in separate files, React
                                        separates concerns with loosely coupled units called “components” that contain both. We will come back
                                        to components in a further section, but if you’re not yet comfortable putting markup in JS, this talk
                                        might convince you otherwise. <br />

                                        React doesn’t require using JSX, but most people find it helpful as a visual aid when working with UI
                                        inside the JavaScript code. It also allows React to show more useful error and warning messages.
                                    </p>
                                </p>
                            </div>
                            <div>Try running some JSX code here... 👇</div>
                            <div className="code-block"></div>
                            <Link to={{ pathname: "https://reactjs.org/docs/introducing-jsx.html" }} target="_blank" className={theme === "light" ? "lang-read-more_light" : "lang-read-more"}>Read more about JSX...</Link>
                        </div>
                    </div>
                </>
            )

        case "python":
            let sideColorPython = { "--bar-clr": "#002750" };
          
            return (
                <>
                    <div className={theme === "light" ? "lang-wrapper_light" : "lang-wrapper"} style={sideColorPython}>
                        <div className="lang-left-col">
                            <div className={theme === "light" ? "lang-left-bar_light" : "lang-left-bar"}>
                                <div>
                                    <img src={PythonLogo} alt="python logo" />
                                </div>
                            </div>
                        </div>
                        <div className="lang-main-col">
                            <div className="lang-back-div">
                                <Link to="#" onClick={()=> history.goBack()} className={theme === "light" ? "lang-back_light" : "lang-back"}>BACK</Link>
                            </div>
                            <h3 className="lang-head"><span>What is P</span>ython?</h3>
                            <div>
                                <p>
                                    Python is an interpreted, object-oriented, high-level programming language with dynamic semantics. Its
                                    high-level built in data structures, combined with dynamic typing and dynamic binding, make it very
                                    attractive for Rapid Application Development, as well as for use as a scripting or glue language to
                                    connect existing components together. Python's simple, easy to learn syntax emphasizes readability and
                                    therefore reduces the cost of program maintenance. Python supports modules and packages, which
                                    encourages program modularity and code reuse. The Python interpreter and the extensive standard library
                                    are available in source or binary form without charge for all major platforms, and can be freely
                                    distributed.
                                </p>
                                <h4 className="lang-sub-head"> More Info </h4>
                                <p>
                                    Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms, including
                                    structured (particularly, procedural), object-oriented and functional programming. Python is often
                                    described as a "batteries included" language due to its comprehensive standard library.
                                </p>
                            </div>
                            <div>Try running some Python code here... 👇</div>
                            <div className="code-block"></div>
                            <Link to={{ pathname: "https://www.python.org/about" }} target="_blank" className={theme === "light" ? "lang-read-more_light" : "lang-read-more"}>Read more about Python...</Link>
                        </div>
                    </div>
                </>
            )
        
        case undefined:
            
            return (
                <>
                    <div className="languages-wrapper">
                        <Link to="languages/css" style={{ backgroundColor: "#1693D1", "color": "#000000" }}>
                            <img src={CSSLogo} alt="css logo" />
                            <span>CSS</span>
                        </Link>
                        <Link to="languages/jsx" style={{ backgroundColor: "#8A53A6", "color": "#FFFFFF" }}>
                            <img src={JSXLogo} alt="jsx logo" />
                            <span>JSX</span>
                        </Link>
                        <Link to="languages/html" style={{ backgroundColor: "#F3642C", "color": "#000000"  }}>
                            <img src={HTMLLogo} alt="html logo" />
                            <span>HTML</span>
                        </Link>
                        <Link to="languages/java" style={{ backgroundColor: "#FF0C0E", "color": "#FFFFFF" }}>
                            <img src={JavaLogo} alt="java logo" />
                            <span>Java</span>
                        </Link>
                        <Link to="languages/javascript" style={{ backgroundColor: "#FED73C", "color": "#000000"  }}>
                            <img src={JavaScriptLogo} alt="javascript logo" />
                            <span>JavaScript</span>
                        </Link>
                        <Link to="languages/json" style={{ backgroundColor: "#3A3A3A", "color": "#FFFFFF" }}>
                            <img src={JSONLogo} alt="json logo" />
                            <span>JSON</span>
                        </Link>
                        <Link to="languages/dart" style={{ backgroundColor: "#2BB6F6", "color": "#000000"  }}>
                            <img src={DartLogo} alt="dart logo" />
                            <span>Dart</span>
                        </Link>
                        <Link to="languages/python" style={{ backgroundColor: "#002750", "color": "#FFFFFF" }}>
                            <img src={PythonLogo} alt="python logo" />
                            <span>Python</span>
                        </Link>
                    </div>
                </>
            )

        default:
          
            return (
                <>
                    <div className="languages-wrapper">
                        <Link to="./css" style={{ backgroundColor: "#1693D1", "color": "#000000" }}>
                            <img src={CSSLogo} alt="css logo" />
                            <span>CSS</span>
                        </Link>
                        <Link to="./jsx" style={{ backgroundColor: "#8A53A6", "color": "#FFFFFF" }}>
                            <img src={JSXLogo} alt="jsx logo" />
                            <span>JSX</span>
                        </Link>
                        <Link to="./html" style={{ backgroundColor: "#F3642C", "color": "#000000"  }}>
                            <img src={HTMLLogo} alt="html logo" />
                            <span>HTML</span>
                        </Link>
                        <Link to="./java" style={{ backgroundColor: "#FF0C0E", "color": "#FFFFFF" }}>
                            <img src={JavaLogo} alt="java logo" />
                            <span>Java</span>
                        </Link>
                        <Link to="./javascript" style={{ backgroundColor: "#FED73C", "color": "#000000"  }}>
                            <img src={JavaScriptLogo} alt="javascript logo" />
                            <span>JavaScript</span>
                        </Link>
                        <Link to="./json" style={{ backgroundColor: "#3A3A3A", "color": "#FFFFFF" }}>
                            <img src={JSONLogo} alt="json logo" />
                            <span>JSON</span>
                        </Link>
                        <Link to="./dart" style={{ backgroundColor: "#2BB6F6", "color": "#000000"  }}>
                            <img src={DartLogo} alt="dart logo" />
                            <span>Dart</span>
                        </Link>
                        <Link to="./python" style={{ backgroundColor: "#002750", "color": "#FFFFFF" }}>
                            <img src={PythonLogo} alt="python logo" />
                            <span>Python</span>
                        </Link>
                    </div>
                </>
            )
    }
}

export default withRouter(Languages);