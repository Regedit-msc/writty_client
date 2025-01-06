import { useState } from "react";
import styled from "styled-components";
import CustomImagePreview from "../customImagePreview";
const ImageCollageContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  padding: 0;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border: 1px solid #e6e6e6;
`;

const Overlay = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

const ArrowDiv = styled.div`
  font-size: 30px;
  color: white;
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: #e6e6e6;
  }
`;

const ImageCollage = ({ images, width, height }) => {
  const [index, setIndex] = useState(0);
  const [showImagePrev, setShowImagePrev] = useState(false);
  return (
    <>
      {showImagePrev ? (
        <CustomImagePreview
          imageUrl={images[index]}
          type={"png"}
          setShowImagePrev={setShowImagePrev}
        />
      ) : (
        ""
      )}
      <ImageCollageContainer width={width ?? "auto"} height={height ?? "200px"}>
        <Overlay>
          {index > 0 ? (
            <ArrowDiv
              onClick={() => {
                if (index > 0) {
                  setIndex(index - 1);
                }
              }}
            >
              ◀
            </ArrowDiv>
          ) : (
            <div></div>
          )}
          <div
            onClick={() => {
              setShowImagePrev(true);
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              fontSize: "20px",
              color: "white",

              cursor: "pointer",
            }}
          >
            View
          </div>
          {index < images.length - 1 ? (
            <ArrowDiv
              onClick={() => {
                if (index < images.length - 1) {
                  setIndex(index + 1);
                }
              }}
            >
              ▶
            </ArrowDiv>
          ) : (
            <div></div>
          )}
        </Overlay>
        <img
          src={images[index]}
          alt="collage"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </ImageCollageContainer>
    </>
  );
};

export default ImageCollage;
