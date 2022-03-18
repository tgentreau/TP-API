export class GetAPI {

    constructor() {
        this.API_KEY = "6634d49f"
        this.URL_FILM_BY_NAME = `http://www.omdbapi.com/?apikey=${this.API_KEY}&s=`
        this.URL_FILM_BY_ID = `http://www.omdbapi.com/?apikey=${this.API_KEY}&i=`
        this.ul = document.querySelector('#film')
        this.res = document.querySelector('#nbrResult')
    }

    getAllFilmByName = async(film) => {
        let err = document.querySelector('#error')
        // let moins = document.querySelector('#moins')
        // let current = document.querySelector('#current')
        // let plus = document.querySelector('#plus')
        // plus.addEventListener('click', () => {
            //     console.log('toto');
            //     page = page + 1
            // })
            // moins.addEventListener('click', () => {
                //     console.log('toto2');
                //     page = page - 1
                // })
                // current.value = page
                let page = 1
                await fetch(`${this.URL_FILM_BY_NAME}${film}&page=${page}`)
                .then(data => data.json())
                .then(data => {
                    if(data.Response === "True") {
                        err.innerHTML = ''
                        this.ul.innerHTML = ""
                        this.res.innerHTML = `Nombre de résultats : ${data.totalResults}`
                        console.log(data)
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
                                console.log(this.getFilmByID(img[i].name));
                            })
                        }
                    }
                    if(data.Error === "Movie not found!") {
                        err.innerHTML = 'Aucun film trouvé'
                        console.log(data);
                    }
                })
                .catch(e => console.log(e))
    }

    getFilmByID = async(id) => {
        await fetch(`${this.URL_FILM_BY_ID}${id}`)
                .then(data => data.json())
                .then(data => {
                    this.res.innerHTML = ""
                    this.ul.innerHTML = ` 
                    <li><img src="${data.Poster}" alt="affiche"></li>
                    <li>Titre: ${data.Title}</li>
                    <li>Résumé: ${data.Plot}</li>
                    <li>Réalisateur : ${data.Director}</li>
                    <li>Acteurs: ${data.Actors}</li>
                    <li>Durée : ${data.Runtime}</li>
                    <li>Box Office: ${data.BoxOffice}</li>
                    <li>Date de sortie cinéma: ${data.Released}</li>
                    <li>Date de sortie DVD: ${data.DVD}</li>
                    <li>Metascore: ${data.Metascore}</li>
                    `
                    console.log(data)
                })
                .catch(e => console.log(e))
    }
}