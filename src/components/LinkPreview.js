import React from 'react'
import '../components/component.css';
import { useQuery, } from 'react-query'
import { makeRequest } from "../axios"

function LinkPreview({url}) {
  
  const { isLoading, error, data } = useQuery(["urlprev", url], () =>
        makeRequest.get("/urlprev?url=" + url).then((res) => {
        return res.data;
        })
  );
  
  return (
    <>
      {
          (isLoading) ? <span>Data is Loading</span>
          :
          <a 
          style = {{color:"wheat"}} 
          target = "_blank"
          rel="noreferrer"
          class = 'url-preview-container' 
          href={data.query_url}>
            
            <img
            alt = "Website Banner"
            style={{width:"100%"}}
            src = {data.image} />

            <span>{data.title}</span>

            <span style={{fontSize:"14px", color:"#a8a8a8"}}>{data.description}</span>
          
            <div style={{display:"flex", flexDirection:"row", gap:"10px"}}>
              <img style={{width:"20px"}} src = {data.favicon} />
              <span style={{fontSize:"12px", color:"gray"}}>{data.query_url}</span>
            </div>
          </a>
      }
    </>
  )
}

export default LinkPreview