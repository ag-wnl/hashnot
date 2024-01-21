import React from 'react'
import '../components/component.css';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery } from 'react-query'
import { makeRequest } from "../axios"
import Post from './Post';
import NoResult from './NoResult';

const Posts = ({userId, searchQuery, sorted, aim, domains, teamSize }) => {
  
  // Forming suitable URL:
  var requestUrl = `/posts?userId=${userId}`;
  if(sorted) {requestUrl += `&sort=${sorted}`}
  if(aim) {requestUrl += `&objective=${aim}`}
  if(domains) {requestUrl += `&domains=${domains}`}
  if(teamSize) {requestUrl += `&teamSize=${teamSize}`}

  const { isLoading, error, data } = useQuery({
    queryKey: ['userId', userId, 'sorted', sorted, 'aim', aim, 'domains', domains, 'teamSize', teamSize],
    queryFn: () => makeRequest.get(requestUrl).then(res => {
      return res.data;
    })
  });
    
  return (
    <>
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        // Note that here we could use post.id as unique index but somehow it shows 2 elements have same key in map so using default indexing
        : ( data.length > 0 ? (data.map((post, index) => <Post post={post}  key={index} />)) : <NoResult /> )
      }
    </>
  )
};

export default Posts;


        