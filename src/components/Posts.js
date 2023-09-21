import React from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery } from 'react-query'
import { makeRequest } from "../axios"
import Post from './Post';

const Posts = ({userId, searchQuery, sorted, aim, domains}) => {

  const { isLoading, error, data } = useQuery({
    queryKey: ['userId', userId, 'sorted', sorted, 'aim', aim, 'domains', domains],
    queryFn: () => makeRequest.get("/posts?userId="+userId+"&sort="+sorted+"&objective="+aim+"&domains="+domains).then(res => {
      return res.data;
    })
  });
  
  console.log(data);
    
  return (
    <>
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post}  key={post.id} />)}
    </>
  )
};

export default Posts;


        