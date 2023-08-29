import React from 'react'
import '../components/component.css';
import { SearchResultEach } from './SearchResultEach';

export const SearchResults = ({results}) => {
  return (
    <div className='results-list'>
        {
            results.map((result, id) => {
                return <SearchResultEach result = {result} key={id} />
            })
        }
    </div>
  )
}
