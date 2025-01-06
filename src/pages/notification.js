import { useEffect, useState } from "react";
import { API_ENDPOINT } from "./url";
import moment from "moment";
import styled from "styled-components";
import ProfileImageWrapper from "../components/profile_image_wrapper";
import { makePriv } from "../auth_hoc/checkAuth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  justify-content: center;
`;

const ContainerDiv = styled.div`
  width: 500px;
  display: flex;
  color: black;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: aliceblue;
  margin-bottom: 10px;
  padding-left: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const NotificationDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    fetch(`${API_ENDPOINT}/notifications/paginated?page=1&limit=10`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        if (jsonRes.success) {
          console.log(jsonRes);
          setNotifications(jsonRes.message.results);
        }
      });
  }, []);

  return (
    <>
      <Container>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => {
            return (
              <div key={index}>
                <ContainerDiv
                  style={{
                    borderRadius:
                      index === 0
                        ? "10px 10px 0px 0px"
                        : index === notifications.length - 1
                        ? "0px 0px 10px 10px"
                        : "0px",
                  }}
                >
                  <ProfileImageWrapper
                    profileImageUrl={notification?.from?.profileImageUrl}
                    username={notification?.from?.username}
                    alt="profile"
                  />
                  <NotificationDiv>
                    <p>{notification.body}</p>
                    <div>{moment(notification.createdAt).format("LLL")}</div>
                  </NotificationDiv>
                </ContainerDiv>
                {/* {index !== notifications.length - 1 && (
                <div
                  style={{
                    backgroundColor: "lightgray",
                    width: "100%",
                    height: "1px",
                  }}
                ></div>
              )} */}
              </div>
            );
          })
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            You have no new notifications.
          </div>
        )}
      </Container>
    </>
  );
};

export default makePriv(Notification);
