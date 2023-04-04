export function ProteinHealthy({
    protHealthy
}: any) 
{           
    return (    
        <div>
            <p className="rh-result-list--text">Proteinbehov som frisk: 
            <br className='rh-result-list--break'></br> 
            <strong> {protHealthy} gram/dygn </strong></p>
        </div>      
    )
} 
export function ProteinUnHealthy({
    lowerLimit,
    upperLimit
}: any)
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
}: any){
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
}: any) {
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