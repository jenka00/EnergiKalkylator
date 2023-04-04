import React from 'react';
import '../calculator.css';
import { useState } from "react";
import CalculatorForm from './CalculatorForm';
import { CalculatorValues } from './ICalculatorValues';
import { activityValues } from './activityValues';
import { ProtHealthy, ProtUnHealthy, ActivityInfo, OverWeightInfo } from './CalculatorInfoText';

function PersonalInput({ 
    inputValue,
    inputTitle,
    inputUnit
    }
    : any) 
    {
        return(
        <div className='rh-result-list-personal--info'>                                    
            <span className='rh-result-list-personal-result--header'>{inputTitle}: </span>  
            <span className='rh-result-list-personal-result--space'></span>                         
                <span><strong>{inputValue && (inputValue + inputUnit)}</strong></span> 
        </div> 
    )
}
export default function EnergyCalculator(){  

    const [values, setValues] = React.useState<CalculatorValues>({
        weight: "",
        length: "",
        age: ""
    });

    const [activity, setActivity] = useState("");

    const [activityMessage, setActivityMessage] = useState("");

    const handleChange = (fieldName: keyof CalculatorValues) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            setValues({...values, [fieldName]: e.target.value});            
        };
    
    const handleSelect = (
        e: React.ChangeEvent<HTMLInputElement>, infoText: string
        ) => {
            setActivity(e.target.value)
            setActivityMessage(infoText.split('(')[0])
    }; 

    const refreshPage = () => {
        window.location.reload();
    }
    
    let weightInNumber = parseInt(values.weight);
    let lengthInNumber = parseInt(values.length)
    let ageInNumber = parseInt(values.age);
    let BMI = Math.round((weightInNumber) / (lengthInNumber/100 * lengthInNumber/100));
    const bmiUpperLimit = 25;
    const bmiLowerLimit = ageInNumber >= 70 ? 22 : 20;
    let energyNeedExtra = 0;
    let energyAdjustment = 1;
    const metabolicRate = parseInt(activity);
     
    //Vid övervikt används den kroppsvikt som motsvarar BMI 25 för personens längd + tillägg av 25% av den överskjutande vikten.
    if (BMI > bmiUpperLimit) {
        let weight25 = bmiUpperLimit * (lengthInNumber / 100 * lengthInNumber / 100);  
        let weightExceeding = weightInNumber - weight25;
        weightInNumber = weight25 + (weightExceeding * 0.25);
    }

    //Energibehov och ämnesomsättning justerat för övervikt
    let energyNeed = metabolicRate * weightInNumber
    let metabolicRateAdjusted = metabolicRate;
    
    //Energibehov justerat för undervikt
    if ( BMI < bmiLowerLimit ) {
        energyAdjustment = energyAdjustment + 0.1;
    }

    //Energibehov justerat för ålder > 70 
    if ( ageInNumber >= 70 ) 
    { 
        energyAdjustment = energyAdjustment - 0.1
    } 

    //Energibehov och ämnesomsättning justerat för ålder < 30 
    if ( ageInNumber < 30 )
    {
        energyNeed = energyNeed * 1.1;
        metabolicRateAdjusted = metabolicRateAdjusted * 1.1;
    } 
        
    energyNeed = energyNeed * energyAdjustment;
    metabolicRateAdjusted = metabolicRateAdjusted * energyAdjustment;
    

    //Intervall för sjuka
    let mrAdjustedExtra = 0;

    if (metabolicRate === 35) {
        mrAdjustedExtra =  40 * (metabolicRateAdjusted / metabolicRate);
        energyNeedExtra = Math.round(mrAdjustedExtra * weightInNumber);
    } 

    //Proteinintervall beroende på hälsotillstånd och ålder
    let protHealthy = ageInNumber >= 70 ? Math.round(weightInNumber * 1.2) : Math.round(weightInNumber * 0.8);
    let protSickLowerLimit = ageInNumber >= 70 ? Math.round(weightInNumber * 1.2) : Math.round(weightInNumber * 1)
    let protSickUpperLimit = ageInNumber >= 70 ? Math.round(weightInNumber * 1.5) : Math.round(weightInNumber * 1.5)

    return (
        <div className='rh-calculator'>            
            <header>                
            </header>
            <h1 className='rh-calculator--headline'>Energikalkylator</h1>
            <main className='rh-calculator-container'>  
                <div className='rh-calculator-column--left'>   
                    <div className='rh-calculator-form'>
                        <div>                         
                            <form>
                                <h2>Beräkna energi</h2>
                                <CalculatorForm 
                                labelTitle="Vikt (kg)" 
                                placeholderTitle='Ange vikt' 
                                value={values.weight} 
                                onChange={handleChange("weight")} 
                                id="weight" /> 

                                <CalculatorForm 
                                labelTitle="Längd (cm)" 
                                placeholderTitle='Ange längd' 
                                value={values.length} 
                                onChange={handleChange("length")} 
                                id="length" />

                                <CalculatorForm 
                                labelTitle="Ålder (år)" 
                                placeholderTitle='Ange ålder' 
                                value={values.age} 
                                onChange={handleChange("age")} 
                                id="age" />                               
                            </form>                                   
                        </div> 
                    </div>                      
                    <div className='rh-calculator-line'></div>
                    <div className="rh-calculator-form rh-calculator-form--last">                       
                        <h2>Aktivitetsnivå</h2>
                        <form>  
                            {
                                activityValues.map(activity => { 
                                    return (                                    
                                    <div className='rh-form-activity-element-control' key={activity.id}>    
                                        <label>    
                                            <div className='rh-form-control--label'>    
                                                <input type="radio" id={activity.id} name="radios" value={activity.value} onChange={(e) => handleSelect(e, activity.clearText)}/>    
                                                <span>{activity.clearText}</span>    
                                            </div>    
                                        </label>    
                                    </div>
                                    )     
                                })
                            }                               
                        </form>       
                    </div>
                </div>                          
                    
                <div className='rh-calculator-column--right'>
                    <div className='rh-calculator-form--last'>
                        {/*Personliga input-värden*/}
                        <div className='rh-result-list'>
                            <div className="rh-result-list--icon">                                
                                <img src='/image/user.svg' alt="användare"></img>
                            </div>
                            <div className="rh-result-list-personal-result">
                                <PersonalInput inputValue={values.weight} inputTitle='Vikt' inputUnit=' kg'/>
                                <PersonalInput inputValue={values.length} inputTitle='Längd' inputUnit=' cm'/>
                                <PersonalInput inputValue={values.age} inputTitle='Ålder' inputUnit=' år'/>
                                <PersonalInput inputValue={0 < BMI && BMI < 300 && (BMI)} inputTitle='BMI' inputUnit=' '/>
                            </div>                            
                        </div>                            
                            {/*Energivärden*/}
                        <div className='rh-result-list'>
                            <div className="rh-result-list--icon">                                
                                <img src='/image/bolt.svg' alt="energi"></img>
                            </div>                            
                            <div className="rh-result-list-info">
                                <ActivityInfo title="Aktivitetsnivå: " text={activityMessage} />
                                <OverWeightInfo length={lengthInNumber} BMI={BMI} />                              
                                { energyNeed > 0 ? 
                                energyNeedExtra > 0 ?
                                (<ActivityInfo 
                                    title="Sammanlagt energibehov: " 
                                    energyValue={`${Math.round(energyNeed)} - ${Math.round(energyNeedExtra)} kcal per dygn`}/>
                                ) :
                                (<ActivityInfo title="Sammanlagt energibehov: " energyValue={Math.round(energyNeed)} text=" kcal per dygn" /> 
                                ) :
                                (<ActivityInfo title="Sammanlagt energibehov: " />
                                )
                                } 
                            </div>                         
                        </div>       

                            {/*Proteinvärden*/}            
                        <div className='rh-result-list rh-result-list--protein'>
                            <div className="rh-result-list--icon">                                
                                <img src='/image/pizza.svg' alt="energi"></img>
                            </div>
                                { protHealthy > 0 ? 
                                (
                                <div className="rh-result-list-info">
                                    <ProtHealthy protHealthy={protHealthy} />
                                    <OverWeightInfo length={lengthInNumber} BMI={BMI} />                                  
                                    <ProtUnHealthy lowerLimit={protSickLowerLimit} upperLimit={protSickUpperLimit} />                                    
                                </div>) :
                                (<div className="rh-result-list-info">
                                    <div>
                                        <p className="rh-result-list--text">Proteinbehov som frisk:</p>
                                    </div> 
                                    <OverWeightInfo length={lengthInNumber} BMI={BMI} />                                     
                                    <div>
                                        <p className="rh-result-list--text">Proteinbehov som sjuk:</p>
                                    </div>
                                </div>) 
                                } 
                        </div>
                    </div>
                </div>                             
            </main>
            <div>
                <button className='rh-refresh--button' type="button" onClick={refreshPage}>Töm formulär</button>
            </div>        
        </div>        
    );
} 