import React from 'react'
import  {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import { useState } from 'react';
import "../../../styles/HomePage/ExploreMore.css";
import CourseCard from './CourseCard';
const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {
    
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
   
    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    };
    
    return (

        <div className='explore-container'>

            <div className='explore-heading'>
                Explore the 
                <HighlightText text={"Depths of Coding"} />
            </div>

            <p className='explore-description'>
                Master the Art of Building Your Ideas
            </p>  

            <div className='explore-tabs'>
                {tabsName.map((element, index) => (
                    <div
                        className={`tab ${currentTab === element ? 'active' : ''}`}
                        key={index}
                        onClick={() => setMyCards(element)}
                    >
                        {element}
                    </div>
                ))}
            </div>
           
          

           
           
            <div className='explore-height'>
                {courses.map((element, index) => (
                   <div className='courseCard'>
                   
                    <CourseCard 
                        key={index}
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                    />
                    </div>
                ))}
            </div>
           
            

        </div> 
    );
};

export default ExploreMore;
