import { EventHandler } from "react";

export default function CalculatorForm({
    labelTitle,
    placeholderTitle,
    value,
    onChange,
    id
}: {labelTitle: string, placeholderTitle: string, value: string, onChange: React.ChangeEventHandler, id: string}){
    return (
        <>
            <label>{labelTitle}</label>
            <div className={`rh-calculator-${id}`}>
                <input
                type="number"
                className="rh-calculator-form-input"
                placeholder={placeholderTitle}
                value={value}
                onChange={(e)=> onChange(e)}
                id={id}
                />
            </div>
        </>
    )
}