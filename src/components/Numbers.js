import React from 'react';
const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Numbers = (props) => {
    const numberClassName = (number) => {
        let result = 'number-game ';
        if (props.usedNumbers.indexOf(number) >= 0)
        {
            result = result + 'used';
        }
        if (props.selectedNumbers.indexOf(number) >= 0)
        {
            result = result + 'selected';
        }
        return result;
    }
    
    return (
        <div className="card text-center">
            <div >
               {numberList.map((number, i) => { 
                   return <span key={i} className={numberClassName(number)} onClick={ () => props.selectNumber(number)}>{number}</span>}) }                
            </div>
        </div>
    );
}

export default Numbers;