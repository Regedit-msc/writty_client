import styled from "styled-components";
import { device } from "../../utils/responsive";

export const SearchWrapper = styled.div`
  margin: 0 5rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 2rem;
  width: 20rem;
  padding: 1rem;
  border-radius: 50px;
  border: 1px solid ${(props) => (props.dark ? "transparent" : "black")};
  border-radius: 50px;
  background-color: ${(props) => (props.dark ? "#191919" : "#D7D7D7")};
  img {
    width: 1.5rem;
  }
  input {
    width: 20rem;
    border: none;
    background-color: transparent;
    outline: none;
    font-family: Gilroy;
    font-style: normal;

    :hover,
    :focus,
    :valid {
      color: #ffffff;
    }
    @media ${device.laptop} {
      width: auto;
      margin: 0;
    }
  }
  button {
    border: none;
    background-color: transparent;
  }
  @media ${device.laptop} {
    padding: 0.8rem;
  }
`;

export const ManinPublicGistsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ManinPublicGists = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 1rem;
  justify-content: space-between;
  padding-top: 1.25rem;

  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0;
  }
`;

export const MacDiv = styled.div`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.125rem;
  display: flex;
  background-color: ${(props) => (props.light ? "#313547" : "#000105")};
  padding: 0px 10px 0px 10px;
  border-radius: 5px 5px 0px 0px;
  p {
    font-family: cursive;
    color: white;
    font-weight: normal;
    font-size: 0.75rem;
  }
  @media ${device.laptop} {
    margin: 0;
  }
`;
export const EditorDiv = styled.div`
  @media ${device.laptop} {
    margin: 0;
  }
`;

export const Mac2Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 3.75rem;
  margin-bottom: 2px;
  position: relative;
  top: -3.75rem;
  z-index: 3;
  color: #ffffff;
  background-color: #141414;
  padding: 0px 10px 0px 10px;
  border-radius: 0px 0px 5px 5px;

  @media ${device.laptop} {
    margin: 0;
  }
`;

export const MainEditorDiv = styled.div`
  width: 37.8rem;

  @media ${device.laptop} {
    width: 400px;
  }
`;
