import VerifiedTag from "../../images/verified-tag.png";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../pages/url";
const ToFollowFromFollowers = ({ type }) => {
  const [tofollow, setToFollow] = useState([]);
  useEffect(() => {
    handleType(type);
  }, [type]);

  function handleFollow(user) {
    fetch(`${API_ENDPOINT}/user/follow`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      method: "POST",
      body: JSON.stringify({ followId: user?.userToFollow?._id }),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        if (jsonRes.success) {
          const toFollowWithoutCurrentUser = tofollow.filter(
            (follower) => follower.userToFollow._id !== user?.userToFollow._id
          );
          if (
            user?.userToFollow?.followers.findIndex(
              (follower) =>
                follower.user === localStorage.getItem("profile_user_id")
            ) !== -1
          ) {
            setToFollow([
              ...toFollowWithoutCurrentUser,
              {
                ...user,
                userToFollow: {
                  ...user.userToFollow,
                  followers: user.userToFollow.followers.filter(
                    (follower) =>
                      follower.user !== localStorage.getItem("profile_user_id")
                  ),
                },
              },
            ]);
          } else {
            setToFollow([
              ...toFollowWithoutCurrentUser,
              {
                ...user,
                userToFollow: {
                  ...user.userToFollow,
                  followers: [
                    ...user.userToFollow.followers,
                    {
                      user: localStorage.getItem("profile_user_id"),
                      createdAt: new Date(),
                    },
                  ],
                },
              },
            ]);
          }
        }
      });
  }

  const handleType = (type) => {
    switch (type) {
      case "tofollow":
        fetch(`${API_ENDPOINT}/tofollow?page=1&limit=10`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              console.log(data);
              setToFollow(data?.message?.results);
            }
          });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="featured-people">
        <h3>Recommended from followers</h3>
        <div className="user-accounts">
          {tofollow.map((user, index) => {
            if (
              localStorage.getItem("profile_user_id") === user?.userToFollow._id
              // userFollowers.findIndex((follower) => {
              //   return follower.user._id === user?.userToFollow?._id;
              // }) !== -1
            )
              return null;

            return (
              <div className="user-account" key={index}>
                <img src={user?.userToFollow?.profileImageUrl} alt="klaus" />
                <div className="user-account-info">
                  <div>
                    <span className="user-account-username">
                      {user?.userToFollow?.username}{" "}
                    </span>
                    <img src={VerifiedTag} alt="Verified" />
                    <span className="user-account-email">...</span>
                  </div>
                  <div className="user-account-desc">
                    <span>{user?.userToFollow?.about}</span>
                  </div>
                </div>
                {
                  <div
                    className="follow yes"
                    onClick={() => {
                      handleFollow(user);
                    }}
                  >
                    {user?.userToFollow?.followers.findIndex(
                      (follower) =>
                        follower.user ===
                        localStorage.getItem("profile_user_id")
                    ) !== -1
                      ? "Following"
                      : "Follow"}
                  </div>
                }
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ToFollowFromFollowers;
