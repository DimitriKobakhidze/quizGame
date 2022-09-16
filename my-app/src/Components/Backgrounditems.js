import React from "react";
import topPic from "../Images/background/top1.png"
import bottomPic from "../Images/background/bottom1.png"




export default function Backgrounditems(props){
    const item1Style ={height: props.quizActive ? "142px" : "242px"}
    return(
        <div className="background-container">
            <img src={topPic} className="background-item2"></img>
            <img src={bottomPic} className="background-item1" style={item1Style} ></img>
        </div>
    )
}

