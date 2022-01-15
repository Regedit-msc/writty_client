import styled from "styled-components";
import { device } from "../../utils/responsive";
export const MainNavDiv = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
  background-color: ${(props) => (props.light ? "white" : "#24252d")};
  padding-top: 1rem;
  padding-bottom: 1rem;

  ul li {
    display: flex;
    flex-direction: row;
    margin-right: 1.5rem;
  }
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
  }

  ul i {
    font-size: x-large;
  }
  ul li a {
    font-size: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
  ul li .active {
    border-bottom: ${(props) => (props.light ? "2px solid #00a8ff" : "")};
    background: ${(props) =>
      !props.light &&
      `
    
     linear-gradient(
        to left,
        #045de9 0%,
        #ffffff 12%,
        #09c6f9 47%,
        #09c6f9 100%
      )
      left bottom no-repeat
    `};
    background-size: ${(props) =>
      !props.light &&
      `
    100% 2px
    `};
    padding: 0.5rem;
    color: ${(props) => (props.light ? "#849c9c" : "white")};
  }
  @media ${device.laptop} {
    display: none;
  }
`;

export const MobileNavDiv = styled.div`
  display: none;
  @media ${device.laptop} {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
    background-color: ${(props) => (props.light ? "white" : "#24252d")};
    padding-top: 1rem;
  }
`;
