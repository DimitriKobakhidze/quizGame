import React, { useEffect } from "react";
import Entry from "./Components/Entry";
import Backgrounditems from "./Components/Backgrounditems";
import Question from "./Components/Question";
import bottomPic from "./Images/background/bottom1.png"
import topPic from "./Images/background/top1.png"


export default function App(){
    const [quizActive,setQuizActive] = React.useState(false)
    const [quizQuestions,setQuizQuestions] = React.useState(() => [])
    const [editEnabled,setEditEnabled] = React.useState(() => true)
    const [totalCorrect,setTotalCorrect] = React.useState(0)


    // console.count("App render")







    //calculate total correct answers, fires after editEnabled (user clicks check answers) is changed
    React.useEffect(()=>{
        let correctArray = []
        for(let i=0;i<quizQuestions.length;i++){
            //if find() function gets value only after it pushes in array to prevent pushing undefineds and make correctArray.length to be always 5 
            if(quizQuestions[i].allAnswers.find(item => item.correct == true)){
                correctArray.push(quizQuestions[i].allAnswers.find(item => item.correct == true))
            }
        }
        setTotalCorrect(correctArray.length)
    },[editEnabled == true])




    //getting data from API and storing in state
    function getQuestions(){
            
            fetch(`https://opentdb.com/api.php?amount=5`)
                .then((response) => response.json())
                .then((data) => {
                    //correct and incorrect answers are seperated so I create new array to put those together
                    //using random to generate index so correct answer wont always be on same index of array
                    //making allAnswers array of object to later use it for styles and condition JSX 
                    const fullData = data.results.map(item =>{
                        const randomArrayId5 = Math.floor(Math.random() * item.incorrect_answers.length)
                        const allAnswers5 = [...item.incorrect_answers]
                        allAnswers5.splice(randomArrayId5,0,item.correct_answer)
                        const answersObjectArray = allAnswers5.map(item => ({answer:item,select:false,correct:false}))
                        return({...item,allAnswers:answersObjectArray})
                    })
                    setQuizQuestions(fullData)  
                    
                    if(!quizActive){
                        setQuizActive(true)
                    }
                })
    }

    //creating array of JSX taken from 'Question' component, giving props from data taken from API 
    const questionElements = quizQuestions.map((item,id) => <Question key={id} id={id} selectAnswer={selectAnswer} editEnabled={editEnabled} {...item} />)
     


    ///which answer user chooses, to add styles and mark
    function selectAnswer(event){
        const divId = event.target.getAttribute("divid")
        // console.log(divId)
        // console.log("returning edited array")
        setQuizQuestions(prev =>{
            return prev.map((item,id) =>{
                if(id == divId){
                    const newArray = item.allAnswers
                    for(let i = 0;i<newArray.length;i++){
                        if(newArray[i].answer === event.target.value){
                            newArray[i].select = true
                        }else{
                            newArray[i].select = false
                        }
                    }
                    return ({...item,allAnswers: newArray})
                }else{
                    return item
                }
            })
        })

        
    }
    

    //main function, looks at answers given by user and compares it to API data
    function checkAnswers(){
        // console.log("check")
        setEditEnabled(false)
        const questionsLength = quizQuestions.length
        for(let i=0;i<questionsLength;i++){
            const selectedAnswer = quizQuestions[i].allAnswers.find(item => item.select == true)
            
            const correctAnswer = quizQuestions[i].correct_answer
            
            try{
                if(selectedAnswer.answer == correctAnswer){

                    //for debug
                    // console.log(selectedAnswer)
                    // console.log("True")
                    // console.log(quizQuestions[i])

                    setQuizQuestions(prev =>{
                        return prev.map((item,id) =>{
                            if(id == i){
                                //for debug
                                // console.log("item",item)
                                return ({
                                    ...item,
                                    allAnswers: item.allAnswers.map(item =>{
                                        if(item.select == true){
                                            return {...item,correct:true}
                                        }else{
                                            return item
                                        }
                                    })
                                })
                            }else{
                                return item
                            }
                        })
                    })
                }
            }catch(error){
                console.log(`no selected answer in question - ${i +1} `)
            }
         
            
            
        }
    }


    //for debug 
    // React.useEffect(() => {
    //   console.log("full data",quizQuestions)
    
    // }, [quizQuestions])

    const testing = (editable) => {
        if(editable){
            return(
                <div onClick={checkAnswers}>Check answers</div>
            )
        }else{
            return(
                <div onClick={newGame}>Check answers</div>
            )
        }
    }

    function newGame(){
        getQuestions()
        setEditEnabled(true)
        window.scrollTo(0,0)
    }
        
    const item1Style ={height: quizActive ? "142px" : "242px"}

    return(
        <div className="container">
            <img src={topPic} className="background-item2"></img>
            <img src={bottomPic} className="background-item1" style={item1Style} ></img>
            {/* <Backgrounditems quizActive={quizActive}/> */}
            {quizActive 
            ? 
            <div className="question-main-div">
                    {questionElements}
                    <div className="question-button-div">
                        {!editEnabled && <span className="correct-counter">You scored {totalCorrect}/5 correct answers</span>}
                        {/* {testing(editEnabled)} */}
                        {editEnabled ? <div onClick={checkAnswers}>Check answers</div> : <div onClick={newGame}>Play Again</div>}
                        {/* <div style={!editEnabled ? {pointerEvents: "none"} : {}} onClick={checkAnswers}>Check answers</div> */}
                    </div>
            </div> 
            : 
            <Entry getQuestions={getQuestions} />
            }
       

        </div>
    )

}