import styled from "styled-components";
import LogoPlaceholder from "../images/logo.png";
import { withRouter, Link } from "react-router-dom";
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

const LandingNavBar = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: transparent;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: black;

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
    padding: 0.5rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    color: black;
    width: auto;
    background-color: yellow;
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
  cursor: pointer;
  padding: ${(props) => (props.padding ? props.padding : "0px")};
  height: 40px;
  margin: 5px;
  width: auto;
  border-radius: 30px;
  display: flex;
  width: ${(props) => (props.width ? props.width : "150px")};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
`;
const LandingNavBarButton = styled.div`
  font-weight: bold;
  cursor: pointer;
  padding: ${(props) => (props.padding ? props.padding : "0px")};
  height: 40px;
  margin: 5px;
  width: auto;
  color: white;
  border-radius: 30px;
  display: flex;
  width: 150px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
`;
const SectionLanding = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  > ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;
const GetStartedButton = styled.div`
  cursor: pointer;
  font-weight: bold;
  display: flex;
  color: white;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 50%;
  background-color: ${(props) => props.color};
  height: 10px;
  border-radius: 10px;
`;
const ColouredButton = styled.div`
  cursor: pointer;
  margin-bottom: 20px;
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
            <Link to={`/signup`}>Create account</Link>
          </LandingNavBarButton>
          <LandingNavBarOutlinedButton color={"black"}>
            <Link to={`/login`}>Login</Link>
          </LandingNavBarOutlinedButton>
        </div>
      </LandingNavBar>
      <LandingMobileNavBar>
        <LandingNavBarLogo alt={"logo"} src={LogoPlaceholder} />
        <LandingNavBarLogo alt={"logo"} src={LogoPlaceholder} />
        <LandingNavBarLogo alt={"logo"} src={LogoPlaceholder} />
      </LandingMobileNavBar>
      <SectionLanding>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "150px",
          }}
        >
          <h1 style={{ fontWeight: "bold", fontSize: "30px" }}>
            What is Live-Gists?
          </h1>
          <p
            style={{
              fontWeight: "bold",
              textAlign: "left",

              lineHeight: "30px",
            }}
          >
            Live Gists is a code sharing platform where developers can
            collaborate and write code simultaneously.
          </p>
          <GetStartedButton color="black">
            {" "}
            <Link to={`/login`}>Get Started</Link>
          </GetStartedButton>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img style={{ width: "700px" }} src={LandingSection1} alt="" />
          <div
            style={{
              position: "absolute",
              top: "55%",
              left: "80%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              style={{ width: "600px" }}
              src={LandingSection1Image}
              alt="landing"
            />
          </div>
        </div>
      </SectionLanding>
      <SectionLanding style={{ position: "relative" }}>
        <img style={{ width: "700px" }} src={LandingSection2} alt="landing" />
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "0",
            right: "0",
            marginLeft: "auto",
            marginRight: "auto",
            width: "70%",
            color: "black",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <div>
              <h1 style={{ color: "#546270", fontSize: "30px" }}>
                See code snippets from
              </h1>

              <h1 style={{ fontSize: "30px" }}>Other Developers.</h1>
            </div>

            <div
              style={{ width: "400px", fontWeight: "bold", lineHeight: "30px" }}
            >
              Users’ codes, called gists can be found on the public gists page.
              Here, codes written by other developers which are made public can
              be seen.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: "900px" }}
              src={PublicGistsLanding}
              alt="landing"
            />
          </div>
        </div>
      </SectionLanding>

      <SectionLanding
        style={{
          marginTop: "100px",
          backgroundColor: "#BACAE2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "35px", color: "#3E5475" }}>
          Easy Customization
        </h1>
        <h1>For All Users</h1>
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
            <img style={{ width: "600px" }} src={LightMode} alt="landing" />
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
            <img style={{ width: "600px" }} src={DarkMode} alt="landing" />
          </div>
        </div>
      </SectionLanding>
      <SectionLanding
        style={{
          marginTop: "100px",
          marginBottom: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            width: "50%",
          }}
        >
          <div>
            <h1 style={{ color: "#546270", fontSize: "30px" }}>
              See what other
            </h1>

            <h1 style={{ fontSize: "30px" }}>developers are up to.</h1>
          </div>

          <div
            style={{ width: "300px", fontWeight: "bold", lineHeight: "30px" }}
          >
            The feed section allows you to see activities from other developers
            and also recommend others to follow and posts to engage with.
          </div>
        </div>
        <img
          style={{ width: "900px", objectFit: "contain" }}
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
          marginBottom: "100px",
        }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "30px", color: "white" }}>
          Communicate with
        </h1>
        <h1 style={{ fontWeight: "bold", fontSize: "30px", color: "#8599AC" }}>
          other developers
        </h1>
        <p
          style={{
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            width: "500px",
            lineHeight: "30px",
          }}
        >
          Connect with other developers to share important information and
          discuss about topics of intrest.
        </p>
        <img
          style={{ width: "1000px", marginTop: "40px" }}
          src={Communicate}
          alt="landing"
        />
      </SectionLanding>
      <SectionLanding
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "100px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            width: "50%",
          }}
        >
          <div>
            <h1 style={{ color: "#547061", fontSize: "30px" }}>
              Make your gists
            </h1>

            <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>
              public or private.
            </h1>
          </div>

          <div
            style={{ width: "300px", fontWeight: "bold", lineHeight: "30px" }}
          >
            You can decide to make the codes you write, called gists private or
            public.
          </div>
        </div>
        <br />
        <br />
        <br />
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              transform: "translate(-50%, -50%)",
              width: "500px",
            }}
          >
            <img
              style={{ width: "200px", objectFit: "contain" }}
              src={Private}
              alt="landing"
            />

            <img
              style={{ width: "200px", objectFit: "contain" }}
              src={Public}
              alt="landing"
            />
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
          padding: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            width: "100%",
          }}
        >
          <div>
            <h1 style={{ fontWeight: "bold", fontSize: "35px" }}>
              Ready to try
            </h1>

            <h1
              style={{ color: "#546270", fontSize: "35px", fontWeight: "bold" }}
            >
              Live- Gists for yourself?
            </h1>
          </div>
          <br /> <br /> <br /> <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "500px",
            }}
          >
            <LandingNavBarButton
              color="black"
              padding="0.5rem 2rem 0.5rem 2rem"
            >
              Join the dev team?
            </LandingNavBarButton>
            <LandingNavBarOutlinedButton
              color={"black"}
              width="auto"
              padding="0.5rem 2rem 0.5rem 2rem"
            >
              Sign up for early access
            </LandingNavBarOutlinedButton>
          </div>
        </div>
      </SectionLanding>
      <footer>
        <div
          style={{
            height: "20rem",
            width: "100ww",
            backgroundColor: "#24252D",
            color: "white",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: " 3rem 8rem 1rem 8rem",
            fontWeight: "bold",
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <h2>LANGUAGES</h2>
            <p
              onClick={() => {
                props.history.push("/languages/html");
              }}
            >
              HTML
            </p>
            <p
              onClick={() => {
                props.history.push("/languages/dart");
              }}
            >
              Dart
            </p>
            <p
              onClick={() => {
                props.history.push("/languages/javascript");
              }}
            >
              JavaScript
            </p>
            <p
              onClick={() => {
                props.history.push("/languages/html");
              }}
            >
              Css
            </p>
            <p
              onClick={() => {
                props.history.push("/languages/python");
              }}
            >
              Python
            </p>
            <p
              onClick={() => {
                props.history.push("/languages/jsx");
              }}
            >
              React
            </p>
          </div>
          <div>
            <h2>PAGES</h2>
            <p>Public gists</p>
            <p>Feed</p>
            <p>Create gist</p>
            <p>Messages</p>
            <p>Notifications</p>
            <p>Menu</p>
          </div>
          <div>
            <h2>COMPANY</h2>
            <p>About</p>
            <p>Contact Us</p>
          </div>
          <div></div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",

            width: "100%",
            alignItems: "center",
            backgroundColor: "#2E3340",
            padding: "0.5rem 8rem 0.5rem 8rem",
          }}
        >
          <LandingNavBarLogo alt={"logo"} src={LogoPlaceholder} />
        </div>
      </footer>
    </>
  );
};

export default withRouter(NewLanding);
