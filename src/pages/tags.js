import { useEffect } from "react";
import { API_ENDPOINT } from "./url";
import { useParams } from "react-router-dom";
import { useTitle } from "../utils/title";

const Tags = () => {
  const { tag } = useParams();
  useTitle(`#${tag}`);
  useEffect(() => {
    fetch(`${API_ENDPOINT}/tags?tags=${tag.trim()}&page=1&limit=10`, {
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
        }
      });
  }, [tag]);

  return (
    <div>
      <h1>Tags</h1>
    </div>
  );
};

export default Tags;
