import React from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery } from 'react-query'
import { makeRequest } from "../axios"
import Post from './Post';
import NoResult from './NoResult';

const Posts = ({userId, searchQuery, sorted, aim, domains, teamSize }) => {

  const { isLoading, error, data } = useQuery({
    queryKey: ['userId', userId, 'sorted', sorted, 'aim', aim, 'domains', domains, 'teamSize', teamSize],
    queryFn: () => makeRequest.get("/posts?userId="+userId+"&sort="+sorted+"&objective="+aim+"&domains="+domains+"&teamSize="+teamSize).then(res => {
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
        : ( data.length > 0 ? (data.map((post) => <Post post={post}  key={post.id} />)) : <NoResult /> )
      }
    </>
  )
};

export default Posts;


        