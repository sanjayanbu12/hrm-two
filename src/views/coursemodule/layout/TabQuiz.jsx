import React from 'react'; 
import { TabView, TabPanel } from 'primereact/tabview';
// import Quiz from './Quiz';
import QuizForm from './QuizForm';
import StepperQuiz from './StepperQuiz';
const TabQuiz=( {courseid})=> {
console.log(courseid,"This is tab quiz")
    return (
        <div >
            <TabView>
                <TabPanel header={<div style={{ marginLeft: 6 }}>Course Quiz</div>} leftIcon="pi pi-credit-card mr-2">
                   {/* <Quiz  courseid={courseid}/> */}
                   <StepperQuiz courseid={courseid}  />
                </TabPanel>
                <TabPanel header={<div style={{ marginLeft: 6 }}>Quiz Form</div>} leftIcon="pi pi-calculator mr-2">
                    <QuizForm courseid={courseid}/>
                </TabPanel>
               
            </TabView>
        </div>
    )
}

export default TabQuiz
        