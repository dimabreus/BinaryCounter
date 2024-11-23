const countText = document.querySelector(".count>span");
const addValueInput = document.querySelector(".add>input");

const plusAnimationName = 'plus';
const minusAnimationName = 'minus';

let currentCounter = 0;

const numbers = new Array(8).fill(0);
const numbersElements = [...document.querySelectorAll(".bytes span")].reverse();

let base = 1;

function addMultiple() {
    const count = addValueInput.value;

    for (var i = 1; i <= count; i++) {
        addOneTo();
    }
}

function addOneTo(index = 0) {
    if (index === numbers.length - 1 && numbers[index] >= base) { // If it's last number
        reset();
        startAnimation(index, minusAnimationName);
    } else if (numbers[index] >= base) { // If this digit already filled go to next digit
        numbers[index] = 0;
        addOneTo(index + 1);
        startAnimation(index, minusAnimationName);
    } else {
        startAnimation(index, plusAnimationName);

        numbers[index]++;
        currentCounter++;
    }


    countText.textContent = currentCounter;
    applyNumbers();
}

function reset() {
    currentCounter = 0;
    numbers.fill(0);
    countText.textContent = currentCounter;

    applyNumbers();
}

function applyNumbers() {
    for (var i = 0; i < numbers.length; i++) {
        numbersElements[i].textContent = numbers[i];
    }
}

function startAnimation(index, animationName) {
    const classList = numbersElements[index].classList;

    if (classList.contains(plusAnimationName) || classList.contains(minusAnimationName)) {
        classList.remove(plusAnimationName);
        classList.remove(minusAnimationName);

        setTimeout(() => classList.add(animationName), 0);
    } else {
        classList.add(animationName);
    }
}

function setBase(numBase) {
    numBase--;

    if (base === numBase) return;

    base = numBase;
    reset();
}

function formatInput(input, min, max) {
    input.value = Math.min(max, Math.max(min, input.value || min));
}