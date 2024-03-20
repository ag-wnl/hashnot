import React from 'react'
import '../components/component.css';
import not_found_img from '../imgs/not_found.png'

function NoResult( {searchQ} ) {
    return (
        <>
            <div class='no-res-box'>
                <img 
                alt='No Results'
                style={{width:'300px'}}
                src={not_found_img} />
                <span class  = 'no-res-txt'>No results found...</span>
            </div>
        </>
    )
}

export default NoResult;