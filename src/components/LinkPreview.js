import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { load } from 'cheerio';

function LinkPreview({ url }) {
  const [image, setImage] = useState('');
  const [heading, setHeading] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios.get(url)
      .then((response) => {
        const html = response.data;
        const $ = load(html);

        // Extract the most important image and text heading
        const imgElement = $('img'); // You might need to use a specific selector
        const headingElement = $('h1, h2, h3'); // You can adjust the heading element selection

        const imgSrc = imgElement.attr('src');
        const headingText = "TEST"
        // console.log(headingText);
        // headingElement.first().text();
        setImage(imgSrc);
        setHeading(headingText);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching website:', error);
        setLoading(false);
      });
  }, [url]);

  if (loading) {
    return <div>Loading Preview...</div>;
  }

  return (
    <div>
      {image && <img src={image} alt="Website Image" />}
      <h1>{heading}</h1>
    </div>
  );
}

export default LinkPreview;
