import React from "react";



export default function Question(props){
    console.count("Question comp" )
    if(props.allAnswers.length !== 0){
        // console.log("component answers",props.allAnswers)
        let selectedStyle ={
            backgroundColor: "#D6DBF5",
            border: "none"
        }
        let correctStyle ={
            backgroundColor: "#94D7A2",
            border: "none",
            pointerEvents: "none"
        }
        let defaultStyle = {
            backgroundColor:"white"
        }
        if(!props.editEnabled){
            selectedStyle={...selectedStyle,pointerEvents: "none"}
            correctStyle={...correctStyle,pointerEvents: "none"}
            defaultStyle={...defaultStyle,pointerEvents: "none"}
        }
        
        ///many conditional styling so I put this into function wich takes mapping item and returns style
        let testStyle = (item) => {
            try{
                ///if editEnable is off, prevents button click so user cant change answers
                if(!props.editEnabled){
                    selectedStyle={...selectedStyle,pointerEvents: "none"}
                    correctStyle={...correctStyle,pointerEvents: "none",fontWeight: '700'}
                    defaultStyle={...defaultStyle,pointerEvents: "none"}
                    if(item.correct){ 
                        return correctStyle
                    }else{
                        if(item.select){
                            return {...selectedStyle,backgroundColor:"#F8BCBC"}
                        }else if(item.answer == props.correct_answer){
                            return correctStyle
                        }else{
                            return defaultStyle
                        }
                    }
                }else{
                    return item.select ? item.correct ? correctStyle : selectedStyle : defaultStyle
                }
            }catch(error){
                console.log("no style in question component")
            }
        }
        const answersElements = props.allAnswers.map((item,id) => <button key={id} divid={props.id} 
        style={testStyle(item)} 
        value={item.answer} onClick={props.selectAnswer} className="question-button">{item.answer.replace(/&quot;/g,"'").replace(/&uacute;/g,"ú")}</button>)
        return(
            <div className="question-input-div">
                <div className="question-div">
                    <h2 className="question-header">{props.question.replace(/&quot;/g,"'").replace(/&#039;/g,"'")}</h2>
                    <div className="question-answers-div">
                    </div>
                    {answersElements}
                    <hr className="question-seperator"></hr>
                </div>
            </div>
        )
    }
}
  
    

