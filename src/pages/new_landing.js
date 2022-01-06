import styled from "styled-components";
import LogoPlaceholder from "../images/logo.png";
import CodeCollaboration from "../images/code_collaboration.svg";
import PublicGistsLanding from "../images/public_gists_landing.svg";
import LandingSection1 from "../images/landing_section_1.svg";
import LandingSection2 from "../images/landing_section_2.svg";
import LandingSection1Image from "../images/landing_section_1_image.svg";
import LightMode from "../images/light_mode_landing.svg";
import DarkMode from "../images/dark_mode_landing.svg";
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
  height: 40px;
  margin: 5px;
  width: auto;
  border-radius: 30px;
  display: flex;
  width: 150px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
`;
const LandingNavBarButton = styled.div`
  font-weight: bold;
  cursor: pointer;
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
`;
const GetStartedButton = styled.div`
  cursor: pointer;

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
const NewLanding = () => {
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
          <input
            type="search"
            name="search"
            id="search-nav"
            className="search-c"
            placeholder="Search"
            autoComplete="off"
          />
        </div>
        <div style={{ display: "flex", marginRight: "10px" }}>
          <LandingNavBarButton color={"black"}>
            Create Account
          </LandingNavBarButton>
          <LandingNavBarOutlinedButton color={"black"}>
            Login
          </LandingNavBarOutlinedButton>
        </div>
      </LandingNavBar>
      <SectionLanding>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "150px",
          }}
        >
          <h1 style={{ fontWeight: "bold" }}>What is Live-Gists?</h1>
          <p style={{ fontWeight: "bold", textAlign: "left" }}>
            Live Gists is a code sharing platform where developers can
            collaborate and write code simultaneously.
          </p>
          <GetStartedButton color="black">Get Started</GetStartedButton>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img style={{ width: "700px" }} src={LandingSection1} />
          <div
            style={{
              position: "absolute",
              top: "50%",
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
              <h1 style={{ color: "#546270" }}>See code snippets from</h1>

              <h1>Other Developers.</h1>
            </div>

            <div style={{ width: "400px", fontWeight: "bold" }}>
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
          position: "relative",
          marginTop: "100px",
          backgroundColor: "#7A99C8",
          height: "500px",
        }}
      ></SectionLanding>
    </>
  );
};

export default NewLanding;
