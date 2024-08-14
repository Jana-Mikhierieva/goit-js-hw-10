import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form')
const delayInput = document.querySelector('input[name="delay"]');

const onInputChange = event => {
    delayInput.classList.add('is-pressed');
};
delayInput.addEventListener('input', onInputChange);

const handleSubmit = (event) => {
    event.preventDefault();    
    const stateInput = document.querySelector('input[name="state"]:checked');
    const delay = delayInput.value;
    const state = stateInput ? stateInput.value : null;
    if (isNaN(delay) || !state) {
        iziToast.error({
            title: 'Error',
            message: 'Please fill out all fields correctly!',
        });
        return;
    }
    
    createPromise(delay, state)
        .then(delay => {
            iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${delay}ms`,
            });
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${error}ms`,
            });
        })
        .finally(() => {
            
            form.reset();
            delayInput.classList.remove('is-pressed');
        })
};
form.addEventListener('submit', handleSubmit);
function createPromise (delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}

