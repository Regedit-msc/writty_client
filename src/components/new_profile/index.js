import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_ENDPOINT } from "../../pages/url";
import moment from "moment";
import injectSheet from "react-jss";
import { StyleSheet } from "../../utils/shimmer";
import { Controlled as CodeMirror } from "react-codemirror2";
import like from "../../images/like.png";
import Code from "../../images/code.svg";
import notLike from "../../images/not_like.png";
import CustomShimmer from "../shimmerComp";
import comment from "../../images/comments.png";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
//generate random colors
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getColor() {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    (25 + 70 * Math.random()) +
    "%," +
    (85 + 10 * Math.random()) +
    "%)"
  );
}
const MainBackgroundContainer = styled.div`
  background-color: ${getColor()};
  height: 400px;
`;
const ProfileContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 200px;
  background-color: white;
  border: 1px solid #e6e6e6;
  width: 700px;
  height: auto;
  padding: 20px;
`;
const GistDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;

  width: 600px;
  height: 400px;
  border-radius: 10px;
`;

const GistsContainer = styled.div`
  margin-top: ${(props) => (props.readMore ? "500px" : "400px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GistButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const PaginationButton = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background-color: aliceblue;
  border-radius: 10px;

  font-weight: bold;
  padding: 15px 30px 15px 30px;
`;

const Profile1Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px 0px 30px;
  margin-left: auto;
  margin-right: auto;
`;

const Profile2Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 30px 0px 30px;
  margin-left: auto;
  margin-right: auto;
`;
const UserFollowerIshInfo = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  padding-right: 20px;
  height: 100px;
`;
const UserFollowerIshInfo1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const UserFollowerIshInfo1Item = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: center;
`;

const EditProfileButton = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  height: 10px;
  border-radius: 10px;
  border: 1px solid black;
`;

const OtherProfileButton = styled.div`
  cursor: pointer;
  margin: 10px;
  display: flex;
  color: white;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  background-color: ${(props) => props.color};
  height: 10px;
  border-radius: 10px;
`;
const UserTextInfoAndLanguages = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
`;

const LanguageButton = styled.div`
  height: 30px;
  margin: 5px;
  width: auto;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
`;

const ImageP = styled.img`
  vertical-align: middle;
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  border: 4px solid #2e36ff;
  margin-bottom: 1rem;
  transition: 1s;

  &:hover {
    transform: rotateY(180deg);
  }
`;

const NewProfileComp = (props) => {
  const navigate = useNavigate();
  const { enqueueSnackbar: snack } = useSnackbar();
  const [initialPage, setInitPage] = useState(1);
  const [pagePrev, setPagePrev] = useState();
  const [userData, setUserData] = useState();
  const [pageNext, setPageNext] = useState();
  const [readMore, setReadMore] = useState(false);
  const [gists, setGists] = useState([]);
  const [profileID, setProfileID] = useState();
  const { name } = useParams();
  useEffect(() => {
    fetch(
      API_ENDPOINT +
        `/get/user/docs?username=${name}&page=${initialPage}&limit=5`
    )
      .then((res) => res.json())
      .then((response) => {
        setPageNext(response.message.next?.page);
        setPagePrev(response.message.previous?.page);
        setGists(response.message.results);
      });
    console.log(initialPage);
  }, [initialPage, name]);

  useEffect(() => {
    fetch(API_ENDPOINT + `/details/public?name=${name.trim()}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setUserData(response.message);
          setProfileID(response.message.userID);
        } else {
          navigate("/user_does_not_exist");
        }
      });
  }, [name, navigate]);

  function previous() {
    setGists([]);
    setPageNext(null);
    setPagePrev(null);
    setInitPage(pagePrev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() {
    setGists([]);
    setPageNext(null);
    setPagePrev(null);
    setInitPage(pageNext);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function handleCopy(val, text) {
    navigator.clipboard.writeText(val);
    snack(text);
  }

  function handleLikeClick(id) {
    fetch(`${API_ENDPOINT}/like`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      method: "POST",
      body: JSON.stringify({ publicLink: id }),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes);
        if (jsonRes.success) {
          // let newArr = [];
          const codeWithoutCodeToChange = gists.filter(
            (e) => e.publicLink !== id
          );
          const codeToChange = gists.filter((e) => e.publicLink === id)[0];
          const newCode = Object.assign(
            {},
            {
              ...codeToChange,
              likes: [
                ...(codeToChange.likes.findIndex(
                  (e) => e.user === localStorage.getItem("profile_user_id")
                ) === -1
                  ? [
                      ...codeToChange.likes,
                      { user: localStorage.getItem("profile_user_id") },
                    ]
                  : [
                      ...codeToChange.likes.filter(
                        (e) =>
                          e.user !== localStorage.getItem("profile_user_id")
                      ),
                    ]),
              ],
            }
          );
          console.log(newCode, "newCode");
          setGists([...codeWithoutCodeToChange, newCode]);
        } else {
          snack("You have to be logged in to like.");
        }
      });
  }
  function handleFollow() {
    fetch(`${API_ENDPOINT}/user/follow`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      method: "POST",
      body: JSON.stringify({ followId: profileID }),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        if (jsonRes.success) {
          console.log(jsonRes);
          const isFollowing =
            userData?.followers?.length > 0
              ? userData.followers.findIndex(
                  (e) => e.user === localStorage.getItem("profile_user_id")
                )
              : -1;
          if (isFollowing === -1) {
            setUserData({
              ...userData,
              followers: [
                ...userData.followers,
                { user: localStorage.getItem("profile_user_id") },
              ],
            });
          } else {
            setUserData({
              ...userData,
              followers: [
                ...userData.followers.filter(
                  (e) => e.user !== localStorage.getItem("profile_user_id")
                ),
              ],
            });
          }
        } else {
        }
      });
  }

  function handleCommentClick(id) {
    navigate(`/comments/editor/${id}`);
  }
  return (
    <>
      <div>
        <MainBackgroundContainer>
          <ProfileContainer>
            <Profile1Container>
              {userData ? (
                <ImageP src={userData?.image} alt="dp" />
              ) : (
                <CustomShimmer>
                  <div className={props.classes.circleBig} />
                </CustomShimmer>
              )}
              <UserFollowerIshInfo>
                <UserFollowerIshInfo1>
                  <UserFollowerIshInfo1Item>
                    {" "}
                    <div>
                      <b>
                        {userData !== null ? userData?.followers?.length : 0}
                      </b>
                    </div>
                    <div>Followers</div>
                  </UserFollowerIshInfo1Item>
                  <UserFollowerIshInfo1Item>
                    <div>
                      <b>
                        {userData !== null ? userData?.following?.length : 0}
                      </b>
                    </div>
                    <div>Following</div>
                  </UserFollowerIshInfo1Item>
                  <UserFollowerIshInfo1Item>
                    <div>
                      <b>{userData !== null ? userData?.code?.length : 0}</b>
                    </div>
                    <div>Gists</div>
                  </UserFollowerIshInfo1Item>
                </UserFollowerIshInfo1>
                {localStorage.getItem("profile_user_name") === name ? (
                  <>
                    <EditProfileButton>
                      <b>Edit Profile</b>
                    </EditProfileButton>
                  </>
                ) : (
                  userData && (
                    <>
                      <OtherProfileButton
                        color="#415E8A"
                        onClick={handleFollow}
                      >
                        {userData !== null ? (
                          userData?.followers.findIndex(
                            (e) =>
                              e.user === localStorage.getItem("profile_user_id")
                          ) === -1 ? (
                            <b>Follow</b>
                          ) : (
                            <b>Following</b>
                          )
                        ) : (
                          ""
                        )}
                      </OtherProfileButton>
                      <OtherProfileButton color="black">
                        <Link to={`/${name}/chat`}>
                          {" "}
                          <b>Message</b>
                        </Link>
                      </OtherProfileButton>
                      <OtherProfileButton color="black">
                        <Link
                          to="#"
                          onClick={() =>
                            handleCopy(
                              userData.email,
                              "Copied email to clipboard."
                            )
                          }
                        >
                          <b>Connect</b>
                        </Link>
                      </OtherProfileButton>
                    </>
                  )
                )}
              </UserFollowerIshInfo>
            </Profile1Container>
            <Profile2Container>
              <UserTextInfoAndLanguages>
                <div style={{ marginBottom: "10px", fontSize: "18px" }}>
                  <b>{name}</b>
                </div>
                <div style={{ fontSize: "16px" }}>
                  {" "}
                  {userData?.skills?.length > 0 ? userData.skills[0] : ""}
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    width: "300px",
                    display: "flex",

                    flexWrap: "wrap",
                  }}
                >
                  {userData?.skills?.length > 0
                    ? userData.skills?.map((skill, index) => {
                        return (
                          <LanguageButton key={index} color={getRandomColor()}>
                            <div style={{ padding: "20px" }}>{skill}</div>
                          </LanguageButton>
                        );
                      })
                    : ""}
                  {userData?.languages?.length > 0
                    ? userData.languages?.map((language, index) => {
                        return (
                          <LanguageButton key={index} color={getRandomColor()}>
                            <div style={{ padding: "20px" }}>{language}</div>
                          </LanguageButton>
                        );
                      })
                    : ""}
                </div>
              </UserTextInfoAndLanguages>
            </Profile2Container>
            <Profile2Container>
              <UserTextInfoAndLanguages>
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "16px",
                    width: "300px",
                    height: readMore ? "200px" : "auto",
                    whiteSpace: "break-word",
                    overflow: readMore ? "visible" : "hidden",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (userData?.about.length > 1000) {
                      setReadMore(true);
                    } else {
                      if (!readMore) return;
                      setReadMore(false);
                    }
                  }}
                >
                  {userData?.about.length > 1000
                    ? userData?.about.slice(0, 1000) + " Read more..."
                    : userData?.about}
                </div>
              </UserTextInfoAndLanguages>
            </Profile2Container>
          </ProfileContainer>
        </MainBackgroundContainer>
        <GistsContainer readMore={readMore}>
          {gists !== null ? (
            gists.map((doc, index) => {
              return (
                <GistDiv key={index}>
                  <div className={"mac1_light"}>
                    <img src={Code} alt="mac_buttons" />
                    <p>{moment(doc.createdAt).startOf("hour").fromNow()}</p>
                    <p>
                      {doc.name.toUpperCase()} /{" "}
                      <span
                        className="language_button"
                        style={{
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingTop: "2px",
                          paddingBottom: "2px",
                        }}
                        id={
                          doc.language[0].toUpperCase() +
                          doc.language.slice(1, doc.language.length)
                        }
                      >
                        {doc.language[0].toUpperCase() +
                          doc.language.slice(1, doc.language.length)}{" "}
                      </span>{" "}
                    </p>
                  </div>
                  <CodeMirror
                    value={doc.data}
                    options={{
                      lineWrapping: true,
                      lint: true,
                      mode: doc?.language,
                      theme: "elegant",
                      lineNumbers: false,
                      scrollbarStyle: "null",
                    }}
                  />
                  <div className={"mac2"}>
                    <p className="user_info">
                      <img
                        className="profile_pic"
                        src={doc.user?.profileImageUrl}
                        alt="profile."
                      />
                    </p>

                    <div className="like_comment">
                      <div id="likes">
                        <img
                          src={
                            doc?.likes?.findIndex(
                              (e) =>
                                e.user ===
                                localStorage.getItem("profile_user_id")
                            ) === -1
                              ? notLike
                              : like
                          }
                          alt="like button"
                          onClick={() => handleLikeClick(doc.publicLink)}
                        />{" "}
                        <span>{doc?.likes?.length ?? 0}</span>
                      </div>

                      <div
                        id="comments"
                        onClick={() => handleCommentClick(doc.publicLink)}
                      >
                        <img
                          src={comment}
                          alt="comment button"
                          onClick={() => {}}
                        />{" "}
                        <span>{doc?.comments?.length ?? 0}</span>
                      </div>
                    </div>
                  </div>
                </GistDiv>
              );
            })
          ) : (
            <>
              <GistDiv>
                <CustomShimmer>
                  <div className={props.classes.codeBox} />
                </CustomShimmer>
              </GistDiv>
              <GistDiv>
                <CustomShimmer>
                  <div className={props.classes.codeBox} />
                </CustomShimmer>
              </GistDiv>
            </>
          )}
        </GistsContainer>
        <GistButtonContainer>
          {pagePrev ? (
            <PaginationButton
              style={{ marginRight: "10px" }}
              onClick={previous}
            >
              Previous
            </PaginationButton>
          ) : (
            ""
          )}
          {pageNext ? (
            <PaginationButton onClick={next}>Next</PaginationButton>
          ) : (
            ""
          )}
        </GistButtonContainer>
      </div>
    </>
  );
};
export default injectSheet(StyleSheet)(NewProfileComp);
