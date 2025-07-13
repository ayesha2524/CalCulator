let circles = document.querySelectorAll('.circle')
let userInput = document.querySelector('#user-value')
let operations = document.querySelectorAll('.arithametic')
let removeDigit = document.querySelector('.remove-digit')
let fullRemove = document.querySelector('#c')
let equal = document.querySelector('#equal')
let result;
let showHistoryBtn = document.querySelector('.show-history')
let historyContainer = document.querySelector('.history-container')
let HistoryList = document.querySelector('#history-list')
let isHistoryVisible = false;
let calcContainer = document.querySelector('.cal-container');
let clearHistory = document.querySelector('#history-clear')
let list;
let HistoryArray = []
circles.forEach(circle => {
    circle.addEventListener('click', () => {
        userInput.value += circle.innerText
        userValue = userInput.value
    })
})
removeDigit.addEventListener('click', () => {
    userInput.value = userInput.value.slice(0, -1)
})

fullRemove.addEventListener('click', () => {
    userInput.value = ""
})
operations.forEach((operation) => {
    operation.addEventListener('click', () => {
        console.log(operation.innerText);
        userInput.value += operation.innerText
    })
})
equal.addEventListener('click', () => {
    try {
        let expr = userInput.value
        console.log(expr);
        let operations = ['+', '-', '×', '÷']
        for (let op of operations) {
            if (expr.startsWith(op) || expr.endsWith(op)) {
                throw new Error('Cannot compute expression');
                userInput.value = ""
            }
        }
        let cleanExpr = expr.replace(/x/g, '*').replace(/÷/g, '/')
        console.log(cleanExpr);
        let result = eval(cleanExpr)
        userInput.value = result
        let li = document.createElement('li')
        li.innerText = `${expr}=${result}`
        li.classList.add('list')
        console.log(li);
        HistoryList.appendChild(li)
        HistoryArray.push(li.innerText)
        console.log(HistoryArray);

        // ✅ RIGHT PLACE to attach click event
        li.addEventListener('click', () => {
            console.log("Clicked History:", li.innerText)
            userInput.value = expr; // optionally reuse input
        })

        saveData()


    }
    catch (err) {
        alert("Error: " + err.message)

    }

})

showHistoryBtn.addEventListener('click', () => {
    isHistoryVisible = !isHistoryVisible
    if (isHistoryVisible) {
        calcContainer.style.display = "none";
        historyContainer.style.display = "block";
    }
    else {
        calcContainer.style.display = "flex";  // 👈 show calculator again
        historyContainer.style.display = "none";
    }
})
clearHistory.addEventListener('click', () => {
    HistoryList.innerHTML = ""
    userInput.value = ""
    localStorage.removeItem('calHistory')
})

function saveData() {
    localStorage.setItem('calHistory', JSON.stringify(HistoryArray))
}
function loadData() {
    let storedHistory = localStorage.getItem('calHistory')
    if (storedHistory) {
        HistoryArray = JSON.parse(storedHistory)
        if (HistoryArray.length > 0) {
            for (const element of HistoryArray) {
                let li = document.createElement('li')
                li.innerText = element
                li.classList.add('list')
                console.log(li);
                HistoryList.appendChild(li)
                li.addEventListener('click', () => {
                    console.log("Clicked History:", li.innerText)
                    let expr=element.split('=')
                    console.log("Expression is",expr);
                    
                    userInput.value = expr[0]; // optionally reuse input
                })
                console.log('History',HistoryArray);
                
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadData()
})