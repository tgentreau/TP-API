import { CardAnim } from "./anim.js"

export class GetAPI {

    constructor() {
        this.API_KEY = "6634d49f"
        this.URL_FILM_BY_NAME = `https://www.omdbapi.com/?apikey=${this.API_KEY}&s=`
        this.URL_FILM_BY_ID = `https://www.omdbapi.com/?apikey=${this.API_KEY}&i=`
        this.ul = document.querySelector('#films')
        this.res = document.querySelector('#nbrResult')
        this.pagination = document.querySelector('#pagination')
    }

    /*
    * Liste des 10 premiers films recherché
    * @param: nom du film
    */
    getAllFilmByName = async(film) => {
        let err = document.querySelector('#error')     
        await fetch(`${this.URL_FILM_BY_NAME}${film}`)
        .then(data => data.json())
        .then(data => {
            if(data.Response === "True") {
                err.innerHTML = ''
                this.ul.innerHTML = ""
                this.res.innerHTML = `Nombre de résultats : ${data.totalResults}`
                data.Search.map(d => {
                    this.ul.innerHTML += `
                    <li id="listFilm">
                        <ul class="cards">
                            <li><img src="${d.Poster}" alt="affiche" class="img" name="${d.imdbID}"></li>
                            <li class="oneFilm">Titre: ${d.Title}</li>
                            <li>Date de sortie: ${d.Year}</li>
                        </ul>
                    </li>
                    `
                })
                this.pagination.innerHTML = `
                <div id="moins">
                    <i class="fa-solid fa-chevron-left"></i>
                </div>
                <span id="current">1</span>
                <div id="plus">
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
                `
                console.log(data);
                let moins = document.querySelector('#moins')
                let current = document.querySelector('#current')
                let plus = document.querySelector('#plus')
                let page = 1
                let maxPage = Math.round(data.totalResults / 10)
                if(page < maxPage) {
                    console.log(maxPage);
                    plus.addEventListener('click', () => {
                        page = page + 1
                        if(page > maxPage) {
                            console.log(`${page}, ${maxPage}`);
                            this.pagination.innerHTML = ""
                            err.innerHTML = "Tu vas trop loin, essaie une nouvelle recherche"
                        }
                        this.getFilmByPage(film, page)
                        current.innerHTML = page
                        window.location.href = "index.html#header"
                    })
                }
                if(page >= 1) {
                    moins.addEventListener('click', () => {
                        page = page - 1
                        if(page < 1) {
                            console.log(`${page}`);
                            this.pagination.innerHTML = ""
                            err.innerHTML = "Il n'y a rien par ici, essaie une nouvelle recherche"
                        }
                        this.getFilmByPage(film, page)
                        current.innerHTML = page
                        window.location.href = "index.html#header"
                    })
                }
                // }
                let img = document.querySelectorAll('.img')
                for(let i = 0; i < img.length; i++) {
                    img[i].addEventListener('click', () => {
                        this.getFilmByID(img[i].name)
                    })
                }
            }
            if(data.Error === "Movie not found!") {
                err.innerHTML = 'Aucun film trouvé';
            }
        })
        .catch(e => console.log(e))
    }

    /*
    * Film spécifique
    * @param: id du film
    */
   
    getFilmByID = async(id) => {
        await fetch(`${this.URL_FILM_BY_ID}${id}&plot=full`)
        .then(data => data.json())
        .then(data => {
            this.res.innerHTML = ""
            this.ul.innerHTML = `
            <div id="film"> 
                <li>Titre: ${data.Title}</li>
                <li>Durée : <span id="time">${data.Runtime}</span></li>
                <li id="meta"><span id="score">${data.Metascore}</span></li>
                <li><img src="${data.Poster}" class="img" alt="affiche"></li>
                <li>Résumé: ${data.Plot}</li>
                <li>Réalisateur : ${data.Director}</li>
                <li>Acteurs: ${data.Actors}</li>
                <li>Box Office: ${data.BoxOffice}</li>
                <li>Date de sortie cinéma: ${data.Released}</li>
                <li>Date de sortie DVD: ${data.DVD}</li>
            </div>
            `
        })
        .catch(e => console.log(e))
        this.pagination.innerHTML = ""
        /*
        * Change la couleur du bcg en fonction de la note metacritic
        */
        let meta = document.querySelector('#meta')
        let score = document.querySelector('#score')
        let nbrScore = parseInt(score.innerText)
        if(nbrScore < 40) {
            meta.style.background = 'red'
        }else if(nbrScore > 39 && nbrScore < 60) {
            meta.style.background = 'yellow'
        }
        else {
            meta.style.background = 'green'
        }

        /*
        * Convertion du runtime en heure
        */
        let time = parseInt(document.querySelector('#time').innerText)
        let hours = time / 60
        let rhours = Math.floor(hours)
        let minutes = (hours - rhours) * 60
        let rminutes = Math.round(minutes)
        document.querySelector('#time').innerHTML = `${rhours}h ${rminutes}min`

        let animCard = new CardAnim()
        animCard.animCard()
    }

    /*
    * Charge 10 par 10 les films recherché en changeant de page
    * @param: nom du film et page actuelle
    */

    getFilmByPage = async(film, page) => {
        await fetch(`${this.URL_FILM_BY_NAME}${film}&page=${page}`)
        .then(data => data.json())
        .then(data => {
            this.ul.innerHTML = ""
            data.Search.map(d => {
                this.ul.innerHTML += `
                <li id="listFilm">
                    <ul class="cards">
                        <li><img src="${d.Poster}" alt="affiche" class="img" name="${d.imdbID}"></li>
                        <li class="oneFilm">Titre: ${d.Title}</li>
                        <li>Date de sortie: ${d.Year}</li>
                    </ul>
                </li>
                `
            })
            let img = document.querySelectorAll('.img')
            for(let i = 0; i < img.length; i++) {
                img[i].addEventListener('click', () => {
                    this.getFilmByID(img[i].name)
                })
            }
        })
        .catch(e => console.log(e))
    }
}