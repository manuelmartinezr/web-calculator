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

let a = null;
let b = null;
let operator = null;
let displayed_number = "0";

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
basic_op_btns.forEach((btn)=>{
    btn.addEventListener("click", (event)=>{
        if (event.target.textContent != "="){
            operator = getOperator(event.target.textContent)
        }
        displayed_number = "0"
        if (b != null){
            let result = operate(operator, Number(a), Number(b))
            if (b === "0" && operator === "div"){
                result = "naurr"
                a = null
                displayed_number = result
            } else{
                a = result
                displayed_number = String(Math.round(result * 100)/100);
            }
            display.textContent = displayed_number
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

const mod_btn = document.getElementById('mod-btn')
mod_btn.addEventListener("click", ()=>{
    let result = operate('div', Number(displayed_number), 100)
    if (b == null){
        a = result
    } else{
        b = result
    }
    displayed_number = String(Math.round(result * 100)/100)
    display.textContent = displayed_number
})

const plus_minus_btn = document.getElementById('plus-minus-btn')
plus_minus_btn.addEventListener("click", ()=>{
    if (displayed_number.includes("-")){
        displayed_number = displayed_number.slice(1);
    } else{
        displayed_number = "-" + displayed_number
    }
    if (b == null){
        a = displayed_number
    } else{
        b = displayed_number
    }
    display.textContent = displayed_number
})