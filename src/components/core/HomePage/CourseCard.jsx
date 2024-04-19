import React from 'react';
import "../../../styles/HomePage/CourseCard.css"
const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div className='course-card-main'>
    <div className="course-card">
      <h2>{cardData.heading}</h2>
      <p>{cardData.description}</p>
      <div className="info">
        <span>{cardData.level}</span>
        <span>{cardData.lessionNumber}</span>
        {/* <button
          className={`select-button ${currentCard === cardData.id ? 'selected' : ''}`}
          onClick={() => setCurrentCard(cardData.id)}
        >
          {currentCard === cardData.id ? 'Selected' : ''}
        </button> */}
      </div>
    </div>
    </div>
  );
};

export default CourseCard;
