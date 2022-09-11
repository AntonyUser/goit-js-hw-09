import Notiflix from 'notiflix';
const formEl = document.querySelector('.form')
const {
    elements: { delay, step, amount, button }
} = formEl


function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay })
            } else {
                reject({ position, delay })
            }

        }, delay)

    })
}

formEl.addEventListener('submit', onSubmitForm)

function onSubmitForm(event) {
    event.preventDefault()


    button.disabled = true
    let delayVal = Number(delay.value);
    const stepVal = Number(step.value);
    const amountVal = Number(amount.value);
    setTimeout(() => {
        button.disabled = false
    }, delayVal + stepVal * amountVal)
    for (let i = 1; i <= amountVal; i += 1) {
        createPromise(i, delayVal)
            .then(({ position, delay }) => {
                Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
        delayVal += stepVal
    }

}