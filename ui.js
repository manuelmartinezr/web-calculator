function operate(operator, a, b){
    const operations = {
        add: (a,b) => a + b,
        sub: (a, b) => a - b,
        mult: (a, b) => a * b,
        div: (a,b) => a / b,
    };
    const operation = operations[operator];
    if (!operation){
        throw new Error(`Unsupported operator: ${operator}`);
    }
    return operation(a,b)
}

const display = document.querySelector('.display')
const basic_op_btns = document.querySelectorAll('.basic-operation')
const num_btns = document.querySelectorAll('.number')
// como lidiar con el 0? es necesario cambiarlo a number o no hace nada?

let a = null;
let b = null;
let operator = null;
let displayed_number = null;

function getOperator(operator){
    const operations = {
        '*' : 'mult',
        '+' : 'add',
        '-' : 'sub',
        '/' : 'div',
    }
    return operations[operator]
}

num_btns.forEach((btn)=>{
    btn.addEventListener("click", (event)=>{
        const number = event.target.textContent;
        if(displayed_number === "0" && number != "."){
            displayed_number = number
        } else if (displayed_number.includes(".") && number === "."){
            return
        } else {
            displayed_number += number;
        }
        display.textContent = displayed_number;
        if (operator != null){
            b = displayed_number
        } else{
            a = displayed_number
        }
    });
});

// function does change value of variable outside its scope
// have to click function button twice to op with result, 
// fixed: remove setting operator to null after getting result

basic_op_btns.forEach((btn)=>{
    btn.addEventListener("click", (event)=>{
        if (event.target.textContent != "="){
            operator = getOperator(event.target.textContent)
        } // block scoped?
        displayed_number = "0"
        if (b != null){
            let result = operate(operator, Number(a), Number(b))
            if (b === "0" && operator === "div"){
                result = "naurr"
                a = null
            } else{
                a = result
            }
            console.log(operator)
            console.log(b)
            console.log(result)
            display.textContent = result
            b = null
        }
    });
});

const clear_btn = document.getElementById('clear-btn')
clear_btn.addEventListener("click", ()=>{
    display.textContent = "0";
    a = null;
    b = null;
    operator = null;
    displayed_number = "0";
})