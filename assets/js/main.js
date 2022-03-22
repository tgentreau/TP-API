import { GetAPI } from "./class.js";

/*****Variable*****/

let form = document.querySelector('#form')
let nameFilm = document.querySelector('#name')
let err = document.querySelector('#error')
let res = document.querySelector('#nbrResult')
let moins = document.querySelector('#moins')
let current = document.querySelector('#current')
let plus = document.querySelector('#plus')
let page = 1

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(nameFilm.value == "" || nameFilm.value.length < 3) {
        res.innerHTML = ""
        err.innerHTML = 'Veuillez entrer un nom de film avec trois caractères minimum'
    } else {
        let getAllFilm = new GetAPI()
        getAllFilm.getAllFilmByName(nameFilm.value)
    }  
})
