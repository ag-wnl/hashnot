import React from 'react'
import '../components/component.css';
import { useQuery } from 'react-query'
import { makeRequest } from "../axios"
import Post from './Post';
import NoResult from './NoResult';
import { Spinner } from '@chakra-ui/react';

const Posts = ({userId, onlyShowCurrentUserPosts, searchQuery, sorted, aim, skills, teamSize }) => {
  
  // Forming suitable URL:
  
  let requestUrl = `/posts?userId=${userId}`;

  if(onlyShowCurrentUserPosts) {
    requestUrl = `/posts/UserPosts?userId=${userId}`;
  } else {
    if(sorted) {requestUrl += `&sort=${sorted}`}
    if(aim) {requestUrl += `&objective=${aim}`}

    if(skills && skills.length > 0) {
      const queryString = skills.map(skill => `skill[]=${encodeURIComponent(skill.id)}`).join('&');
      requestUrl += `&${queryString}`
    }
    if(teamSize) {requestUrl += `&teamSize=${teamSize}`}
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['userId', userId, 'sorted', sorted, 'aim', aim, 'skills', skills,'teamSize', teamSize],
    queryFn: () => makeRequest.get(requestUrl).then(res => {
      return res.data;
    })
  });
    
  return (
    <>
      <div class = 'posts-parent-container'>
        {error
          ? "Something went wrong!"
          : isLoading
          ? <div><Spinner /></div>
          // Note that here we could use post.id as unique index but somehow it shows 2 elements have same key in map so using default indexing
          : ( data.length > 0 ? (data.map((post, index) => <Post post={post}  key={index} />)) : <NoResult /> )
        }
      </div>
      
    </>
  )
};

export default Posts;


        