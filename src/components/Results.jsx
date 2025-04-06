import React from "react"

function Results({ element, artwork, userName }) {
  
  return (
    <div>
      <h2>{userName}, Tu elemento es : {element}</h2>
      {artwork && <img src={artwork} alt={element} style={{ width: '300px', height: 'auto' }} />}
    </div>
  );
}

export default Results;
