import React from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery } from 'react-query'
import { makeRequest } from "../axios"
import Post from './Post';

function Posts() {

  const { isLoading, error, data } = useQuery('posts', () =>
  makeRequest.get("/posts").then(res => {
    return res.data;
  })
  );

  console.log(data);

  return (
    <>
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </>
  )
}

export default Posts


        