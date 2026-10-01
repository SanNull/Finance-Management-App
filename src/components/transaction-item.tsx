export function TransactionItem({value, isIncome} : {value: number, isIncome: boolean}){
    return (
        <p>{value}, {isIncome ? 'Entrada' : 'Saída'} </p>
    );
}