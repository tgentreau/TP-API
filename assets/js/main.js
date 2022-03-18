import { GetAPI } from "./class.js";

let form = document.querySelector('#form')
let nameFilm = document.querySelector('#name')
let btn = document.querySelector('#btn')
let err = document.querySelector('#error')
let res = document.querySelector('#nbrResult')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(nameFilm.value == "" || nameFilm.value.length < 3) {
        res.innerHTML = ""
        err.innerHTML = 'Veuillez entrer un nom de film avec trois caractères minimum'
    } else {
        let getAllFilm = new GetAPI()
        getAllFilm.getAllFilmByName(nameFilm.value)
        nameFilm.value = ""
    }
})