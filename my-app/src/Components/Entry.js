import React from "react";



export default function Entry(props){

    // console.count("entry render")
    return(
        <div className="entry-container">
            <h1 className="entry-header">Quizzical</h1>
            <h4 className="entry-description">
                Some description if needed
            </h4>
            <div className="entry-start-game" onClick={props.getQuestions}>Start quiz</div>
        </div>
    )
}