import { useEffect, useState } from "react";
import { API_ENDPOINT } from "./url";
import moment from "moment";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
`;

const ContainerDiv = styled.div`
  width: 700px;
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 10px;
`;
const NotificationDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    fetch(`${API_ENDPOINT}/notifications`, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        if (jsonRes.success) {
          setNotifications(jsonRes.message);
        }
      });
  }, []);

  return (
    <>
      <Container>
        {notifications.map((notification, index) => {
          return (
            <div>
              <ContainerDiv key={index}>
                <img src={notification?.from?.profileImageUrl} alt="profile" />
                <NotificationDiv>
                  <p>{notification.body}</p>
                  <div>{moment(notification.createdAt).format("LLL")}</div>
                </NotificationDiv>
              </ContainerDiv>
              {index !== notifications.length - 1 && (
                <div
                  style={{
                    backgroundColor: "lightgray",
                    width: "100%",
                    height: "1px",
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default Notification;
