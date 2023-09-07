import React, { useState } from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation, useQueryClient, useQuery  } from 'react-query';
import { makeRequest } from "../axios";
import moment from 'moment';

const Messages = ({postId}) => {

    const [desc, setDesc] = useState("");

    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery('messages', () =>
    makeRequest.get("/postcomments?postId="+postId).then(res => {
        return res.data;
        })
    );

    console.log(data)

    const queryClient = useQueryClient();

    const mutation = useMutation(
      (newmsg) => {
        return makeRequest.post("/postcomments", newmsg);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["messages"]);
        },
      }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId });
        setDesc("");
    };

    return (
        <>
            <div className="write">
                <img src={"/upload/" + currentUser.pfp} alt="" />
                <input
                type="text"
                placeholder="write a comment"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                />
                <button onClick={handleClick}>Send</button>
            </div>
            {error
            ? "Something went wrong"
            : isLoading
            ? "loading"
            : data.map((message) => (
                <div className="comment">
                <img src={"/upload/" + message.pfp} alt="" />
                <div className="info">
                    <span>{message.name}</span>
                    <p>{message.desc}</p>
                </div>
                <span className="date">
                    {moment(message.createdAt).fromNow()}
                </span>
                </div>
            ))}
        </>
    )
}

export default Messages