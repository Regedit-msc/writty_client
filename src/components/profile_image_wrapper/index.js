import { Link } from "react-router-dom";
import styled from "styled-components";

const ProfileImageWrapperContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileImageWrapperImage = styled.img`
  object-fit: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ProfileImageWrapper = ({ username, profileImageUrl }) => {
  return (
    <>
      <Link to={`/@/${username}`}>
        <ProfileImageWrapperContainer>
          <ProfileImageWrapperImage src={profileImageUrl} alt="profile" />
        </ProfileImageWrapperContainer>
      </Link>
    </>
  );
};
export default ProfileImageWrapper;
