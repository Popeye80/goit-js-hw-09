import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector(".form");
const dataFormObject = {};
let position = 0;

formEl.addEventListener("submit", ((event) => {
  event.preventDefault();
  const formData = new FormData(formEl);  
  formData.forEach((value, name)=> {
  dataFormObject[name] = value;  
})
  const delay = Number(dataFormObject.delay)
  const amount = Number(dataFormObject.amount)
  const step = Number(dataFormObject.step)
  let stepNumber;
  let iStep;

  if (step) {
    stepNumber = (step*amount)+delay;
    iStep = step}
  else {
    stepNumber = delay*amount;
    iStep = delay -1 };

  for(let iDelay = delay; iDelay < stepNumber; iDelay += iStep) {
    setTimeout(() => {
      let iiDelay;
    if (step === 0) {iiDelay = delay} else {iiDelay = iDelay}
      position += 1
    
  createPromise(position, iiDelay)
    .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms` 
  )})
    .catch(({ position, delay }) => {       
    Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  });
  }, iDelay)}
}));

function createPromise(position, delay) {  
  const shouldResolve = Math.random() > 0.3;
  return new Promise ((resolve, reject) => {
  if (shouldResolve) {
    resolve({position, delay})    
  } else {
    reject({position, delay})}
})};
