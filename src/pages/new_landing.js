import styled from "styled-components";
import LogoPlaceholder from "../images/logo.png";
import { useNavigate, Link } from "react-router-dom";
import HomeRect from "../images/home_rect.svg";
import Private from "../images/private.svg";
import Public from "../images/public.svg";
import Feed from "../images/feed.svg";
import Communicate from "../images/communicate.svg";
import PublicGistsLanding from "../images/public_gists_landing.svg";
import LandingSection1 from "../images/landing_section_1.svg";
import LandingSection2 from "../images/landing_section_2.svg";
import LandingSection1Image from "../images/landing_section_1_image.svg";
import LightMode from "../images/light_mode_landing.svg";
import DarkMode from "../images/dark_mode_landing.svg";
import { device } from "../utils/responsive";
import { GiHamburgerMenu } from "react-icons/gi";

const mobileMargin = "2.5rem";
const desktopMargin = "12vw";
const LandingNavBar = styled.div`
  margin: 0;
  box-sizing: border-box;
  color: transparent;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 32px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: black;
  background-color: white;
  z-index: 2;

  @media ${device.laptop} {
    display: none;
  }
`;
const LandingMobileNavBar = styled.div`
  display: none;

  @media ${device.laptop} {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2rem ${mobileMargin};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    color: black;
    width: auto;
    background-color: white;
    z-index: 2;
    > img {
      width: 38px;
    }
  }
`;
const LandingNavBarLogo = styled.img`
  width: 52px;
  object-fit: contain;
`;
const LandingNavBarText = styled.p`
  font-weight: bold;
  font-size: 26px;
  padding-bottom: 10px;
  padding-left: 10px;
`;
const LandingNavBarOutlinedButton = styled.div`
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  padding: 1.2em 2em;
  height: 40px;
  margin: 5px;
  width: auto;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
  @media (max-width: 1023px) {
    font-size: 0.875rem;
  }
`;
const LandingNavBarButton = styled.div`
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  padding: 1.2em 2em;
  height: 40px;
  margin: 5px;
  width: auto;
  color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  @media (max-width: 1023px) {
    font-size: 0.875rem;
  }
`;
const SectionLanding = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 100%;
  width: 100vw;
  min-height: clamp(640px, 100vh, 960px);
  position: relative;
  padding: clamp(64px, 10vh, 96px) ${desktopMargin} 0vh ${desktopMargin};
  > :first-child {
    > * {
      margin-bottom: 18px;
    }
  }
  > :nth-child(2) {
    img {
      width: 650px;
    }
    > :nth-child(2) > img {
      width: 41vw;
    }
  }
  > ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  p {
    max-width: 380px;
    line-height: 30px;
  }
  hr {
    width: 100px;
    height: 5px;
    border: 3px solid black;
    border-radius: 4px;
  }
  .intro {
    padding-top: clamp(166px, 26vh, 250px);
  }
  .pink-blob {
    left: -${desktopMargin};
    width: 51vw;
    position: absolute;
  }
  .top-spread {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    > :nth-child(2) {
      text-align: right;
    }
  }
  .pub-priv {
    position: absolute;
    top: -50%;
    left: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    > img {
      width: 20vw;
      margin-right: 5vw;
    }
  }
  #landing-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 30px 0;
  }

  @media ${device.laptop} {
    > :nth-child(2) {
      > img {
        width: 400px;
      }
      > :nth-child(2) > img {
        width: 41vw;
      }
    }
    .top-spread {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: start;
      > :first-child {
        margin-bottom: 25px;
      }
      > :nth-child(2) {
        text-align: left;
      }
    }
  }
  @media ${device.tablet} {
    padding: clamp(64px, 10vh, 96px) ${mobileMargin} 0vh ${mobileMargin};

    .intro {
      // padding-top: 0;
    }
    p {
      line-height: 20px;
      max-width: 250px;
      font-weight: 700;
    }
    hr {
      width: 55px;
      height: 3px;
      border: 2px solid black;
      border-radius: 3px;
    }
    .pub-priv {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      left: 0;
      > img {
        width: 35vw;
        margin-right: 5vw;
      }
    }
    #landing-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px 0;
      > * {
        margin-bottom: 10px;
      }
    }
  }
  @media (max-width: 512px) {
    > :nth-child(2) {
      > :nth-child(2) > img {
        display: none;
      }
      > img {
        width: 300px;
      }
    }
  }
  @media (min-width: 1020px) and (max-width: 1240px) {
    > :nth-child(2) > :nth-child(2) > img {
      transform: translateX(40px);
    }
  }
`;
const GetStartedButton = styled.div`
  cursor: pointer;
  font-weight: bold;
  display: inline-flex;
  color: white;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px 70px;
  background-color: ${(props) => props.color};
  // height: 10px;
  border-radius: 10px;
`;
const ColouredButton = styled.div`
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  color: white;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: ${(props) => props.width};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  height: 10px;
  border-radius: 10px;
`;

const NewLanding = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <LandingNavBar>
        <div style={{ display: "flex", marginLeft: "10px" }}>
          <LandingNavBarLogo alt={"logo"} src={LogoPlaceholder} />
          <LandingNavBarText>
            Live-Gists <span style={{ color: "purple" }}>BETA</span>
          </LandingNavBarText>
        </div>
        <div>
          {/* <input
            type="search"
            name="search"
            id="search-nav"
            className="search-c"
            placeholder="Search"
            autoComplete="off"
          /> */}
        </div>
        <div style={{ display: "flex", marginRight: "10px" }}>
          <LandingNavBarButton color={"black"}>
            <Link to={`/auth/signup`}>Create account</Link>
          </LandingNavBarButton>
          <LandingNavBarOutlinedButton color={"black"}>
            <Link to={`/auth/login`}>Login</Link>
          </LandingNavBarOutlinedButton>
        </div>
      </LandingNavBar>
      <LandingMobileNavBar>
        <LandingNavBarLogo alt={"logo"} src={LogoPlaceholder} />
        <GiHamburgerMenu size={28} />
      </LandingMobileNavBar>
      <SectionLanding style={{ overflowY: "hidden" }}>
        <div
          className="intro"
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "visible",
          }}
        >
          <div>
            <h1>What is</h1>
            <h1>Live-Gists?</h1>
          </div>
          <hr style={{ backgroundColor: "black" }} />
          <p
            style={{
              fontWeight: "700",
            }}
          >
            Live Gists is a code sharing platform where developers can
            collaborate and write code simultaneously.
          </p>
          <div>
            <GetStartedButton color="black">
              {" "}
              <Link to={`/auth/login`}>Get Started</Link>
            </GetStartedButton>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
            scrollbarWidth: "none",
          }}
        >
          <img src={LandingSection1} alt="" style={{ zIndex: "3" }} />
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              transform: "translate(10%, 25%)",
            }}
          >
            <img src={LandingSection1Image} alt="landing" />
          </div>
        </div>
      </SectionLanding>
      <SectionLanding style={{ position: "relative" }}>
        <div
          style={{
            position: "relative",
            zIndex: "1",
          }}
        >
          <div
            className="top-spread"
            style={{
              padding: "10px 0px",
            }}
          >
            <div>
              <h1 style={{ color: "#546270" }}>See code from</h1>
              <h1>Other Developers.</h1>
            </div>

            <p
              style={{
                width: "400px",
                fontWeight: "bold",
                lineHeight: "30px",
              }}
            >
              Users’ codes, called gists can be found on the public gists page.
              Here, codes written by other developers which are made public can
              be seen.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "20px 30px 50px 0px rgba(0,0,0,0.3)",
            }}
          >
            <img
              style={{ width: "100%" }}
              src={PublicGistsLanding}
              alt="landing"
            />
          </div>
        </div>
        <img src={LandingSection2} alt="landing" className="pink-blob" />
      </SectionLanding>

      <SectionLanding
        style={{
          marginTop: "100px",
          backgroundColor: "#BACAE2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0",
          paddingTop: "25px",
        }}
      >
        <h1 style={{ color: "#3E5475" }}>Easy Customization</h1>
        <h1>For All Users</h1>
        <hr style={{ width: "200px", margin: "20px 0px" }} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ColouredButton bgColor="white" color="black">
              Light Mode
            </ColouredButton>
            <img style={{ width: "41vw" }} src={LightMode} alt="landing" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "30px",
            }}
          >
            <ColouredButton bgColor="black" color="#678DC9">
              Dark Mode
            </ColouredButton>
            <img style={{ width: "44vw" }} src={DarkMode} alt="landing" />
          </div>
        </div>
      </SectionLanding>
      <SectionLanding
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className="top-spread"
          style={{
            padding: "10px 0",
            width: "66vw",
          }}
        >
          <div>
            <h1 style={{ color: "#546270" }}>See what other</h1>
            <h1>developers are up to.</h1>
          </div>

          <p style={{ width: "300px", fontWeight: "bold", lineHeight: "30px" }}>
            The feed section allows you to see activities from other developers
            and also recommend others to follow and posts to engage with.
          </p>
        </div>
        <img
          style={{ width: "66vw", objectFit: "contain" }}
          src={Feed}
          alt="landing"
        />
      </SectionLanding>
      <SectionLanding
        style={{
          marginTop: "100px",
          backgroundColor: "#24252D",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "100px",
          paddingBottom: "100px",
        }}
      >
        <h1 style={{ color: "white" }}>Communicate with</h1>
        <h1 style={{ color: "#8599AC" }}>other developers</h1>
        <p
          style={{
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            width: "500px",
            lineHeight: "30px",
            margin: "20px 0",
          }}
        >
          Connect with other developers to share important information and
          discuss about topics of interest.
        </p>
        <img
          style={{ width: "73vw", marginTop: "40px" }}
          src={Communicate}
          alt="landing"
        />
      </SectionLanding>
      <SectionLanding
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          paddingTop: "100px",
          minHeight: "clamp(512px, 80vh, 768px)",
        }}
      >
        <div
          className="top-spread"
          style={{
            width: "100%",
          }}
        >
          <div>
            <h1 style={{ color: "#547061" }}>Make your gists</h1>
            <h1>public or private.</h1>
          </div>

          <p
            style={{
              width: "300px",
              fontWeight: "bold",
              lineHeight: "30px",
            }}
          >
            You can decide to make the codes you write, called gists private or
            public.
          </p>
        </div>
        <div style={{ position: "relative", marginTop: "150px" }}>
          <div className="pub-priv">
            <img style={{ objectFit: "contain" }} src={Private} alt="landing" />
            <img style={{ objectFit: "contain" }} src={Public} alt="landing" />
          </div>
          <img
            style={{ width: "100%", objectFit: "contain" }}
            src={HomeRect}
            alt="landing"
          />
        </div>
      </SectionLanding>
      <SectionLanding
        style={{
          minHeight: "clamp(448px, 70vh, 672px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 0",
            width: "100%",
          }}
        >
          <div>
            <h1 style={{ textAlign: "center" }}>Ready to try</h1>
            <h1 style={{ color: "#546270", textAlign: "center" }}>
              Live- Gists for yourself?
            </h1>
          </div>
          <div id="landing-actions">
            <LandingNavBarButton color="black">
              Join the dev team?
            </LandingNavBarButton>
            <LandingNavBarOutlinedButton color={"black"}>
              Sign up for early access
            </LandingNavBarOutlinedButton>
          </div>
        </div>
      </SectionLanding>
      <footer>
        <div
          style={{
            height: "25rem",
            // maxWidth: "100%",
            backgroundColor: "#24252D",
            color: "white",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <h4 style={{ marginBottom: "15px" }}>LANGUAGES</h4>
            <p
              onClick={() => {
                navigate("/languages/html");
              }}
            >
              HTML
            </p>
            <p
              onClick={() => {
                navigate("/languages/dart");
              }}
            >
              Dart
            </p>
            <p
              onClick={() => {
                navigate("/languages/javascript");
              }}
            >
              JavaScript
            </p>
            <p
              onClick={() => {
                navigate("/languages/html");
              }}
            >
              Css
            </p>
            <p
              onClick={() => {
                navigate("/languages/python");
              }}
            >
              Python
            </p>
            <p
              onClick={() => {
                navigate("/languages/jsx");
              }}
            >
              React
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: "15px" }}>PAGES</h4>
            <p>Public gists</p>
            <p>Feed</p>
            <p>Create gist</p>
            <p>Messages</p>
            <p>Notifications</p>
            <p>Menu</p>
          </div>
          <div>
            <h4 style={{ marginBottom: "15px" }}>COMPANY</h4>
            <p>About</p>
            <p>Contact Us</p>
          </div>
          <div></div>
        </div>

        <div
          className="bottom"
          style={{
            width: "100%",
            backgroundColor: "#2E3340",
            color: "rgba(255,255,255, 0.69)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <LandingNavBarLogo alt={"logo"} src={LogoPlaceholder} />
            <p style={{ marginLeft: "15px" }}>Live-Gists</p>
          </div>
          <p>&#169; 2022</p> <p>All rights reserved</p>
        </div>
      </footer>
    </>
  );
};

export default NewLanding;
