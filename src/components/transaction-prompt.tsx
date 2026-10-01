import { useState } from "react";
import { View } from "react-native";
import { TransactionItem } from "./transaction-item";

export function TransactionPrompt(){

    const [inputs, setInputs] = useState({
        'value': 0,
        'isIncome': false,
    })
    const [mappedList, setMap] = useState([{    'value': 0,
    'isIncome': false}])

    const handleChange = (e: any) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event: any) => {
        setMap([...mappedList, inputs])
        event.preventDefault();
  };

    return (
        <View>
    <form onSubmit={handleSubmit}>
      <label>Valor
      <input 
        type="number" 
        name="value" 
        onChange={handleChange}></input>
x
        <input name="isIncome" type="checkbox" onChange={handleChange}></input>

        <button type="submit">Enviar</button>
        </label>
        </form>

        <ul>{
        mappedList.map(i => <TransactionItem value={i.value} isIncome = {i.isIncome}/>)
        
        }</ul>            
        </View>

    );
}