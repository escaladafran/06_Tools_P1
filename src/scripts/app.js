
//Animación menu haburguesa
const hamMenu = document.querySelector('.hamburguer-ct');
hamMenu.addEventListener('click', ()=>{
    hamMenu.classList.toggle('on')
 
})


const media = window.matchMedia('(width < 40em)')

const navMenu = document.querySelector('.topnav__menu');
const navBtn = document.querySelector('.topnav__open');

navBtn.addEventListener('click', ()=>{
    navMenu.classList.toggle("topnav__active")
    console.log('')
})



  








