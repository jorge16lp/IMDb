let page = 1;
let lastSearch = '';
const apiKey = 'd2440ae2';
const urlBase = 'http://www.omdbapi.com/?apikey=' + apiKey;
export const filmsModule = {
    namespaced: true,
    state: () => ({
        films: []
    }),
    actions: {
        async fetchFilms({commit, rootGetters}) {
            const searchText = rootGetters['search/getQuery'];
            if (searchText === lastSearch)
                page++;
            else {
                page = 1;
                commit('setFilms', []);
            }
            lastSearch = searchText;

            fetch(urlBase + '&s=' + searchText
                + '&page=' + page)
                .then(response => response.json())
                .then(data => {
                    if (data.Response === 'True') {
                        for (let i=0; i < data.Search.length; i++) {
                            fetch(urlBase + '&i=' + data.Search[i].imdbID)
                                .then(response => response.json())
                                .then(data => {
                                    commit('addFilm', data);
                                    console.log(data);
                                }).catch(error => console.log(error));
                        }
                        //commit('addFilms', data.Search);
                        //console.log(data.Search);
                    } else {
                        if (data.Search!=undefined && data.Search.length === 0) {
                            commit('setFilms', []);
                            console.log('No more films available');
                        }
                    }
                }).catch(error => console.error(error));
        }

    },
    mutations: {
        setFilms(state, films) {
            state.films = films
        },
        async addFilms(state, films) {
            const array = state.films.concat(films);
            state.films = array;
        },
        addFilm(state, film) {
            state.films[state.films.length] = film;
        }
    },
    getters: {
        getFilms(state) {
            return state.films
        }
    }
}