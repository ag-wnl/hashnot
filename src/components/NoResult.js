import React from 'react'
import '../components/component.css';
import not_found_img from '../imgs/not_found.png'

function NoResult( {searchQ} ) {
    return (
        <>
            <div class='no-res-box'>
                <img 
                style={{width:'300px'}}
                src={not_found_img} />
                <span class  = 'no-res-txt'>No results found for {searchQ.slice(0,10)}...</span>
            </div>
        </>
    )
}

export default NoResult;