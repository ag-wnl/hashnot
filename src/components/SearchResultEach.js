import React from 'react'
import '../components/component.css';

export const SearchResultEach = ({result}) => {
  return (
    <div class = 'search-res'>{result.name}</div>
  )
}
