export function ProteinHealthy({
    proteinHealthy
}: {proteinHealthy: number}) 
{           
    return (    
        <div>
            <p className="rh-result-list--text">Proteinbehov som frisk: 
            <br className='rh-result-list--break'></br> 
            <strong> {proteinHealthy} gram/dygn </strong></p>
        </div>      
    )
} 
export function ProteinUnHealthy({
    lowerLimit,
    upperLimit
}: {lowerLimit: number,
    upperLimit: number})
{
    return (
    <div>
        <p className="rh-result-list--text">Proteinbehov som sjuk: 
        <br className='rh-result-list--break'></br>
        <strong> {lowerLimit} - {upperLimit} gram/dygn</strong></p>
    </div>
    )
}
export function ActivityInfo({
    title,
    text,
    energyValue
}: {title: string,
    text: string,
    energyValue: string}) {
    return(
    <div>
        <p className="rh-result-list--text">{title}
        <br className='rh-result-list--break'></br>    
        <strong>{energyValue}{text}</strong></p>                                   
    </div>
    )
}
export function OverWeightInfo({
    length,
    BMI,
}: {length: number,
    BMI: number,}) {
    const infoText = "Justering för övervikt (BMI > 25)";
    return (    
    <div className='rh-result-list__item-energy-info--overweight'> 
        {(length) > 100 && BMI > 25 
            ? <p className='rh-info-overweight--text'>{infoText}</p> 
            : <p className='rh-info-overweight--text-invisible'>{infoText}</p>   
        } 
        </div> 
    )
}