let page = 1;
let lastSearch = '';
const apiKey = '73740c4d'; // d2440ae2 y 73740c4d
const urlBase = 'http://www.omdbapi.com/?apikey=' + apiKey;
export const filmsModule = {
    namespaced: true,
    state: () => ({
        films: [],
        mostPopularFilms: []
    }),
    actions: {
        async fetchMostPopularFilms({commit}) {
            fetch(urlBase + '&s=shrek') // CHANGE SHREK SEARCH --> TAKE MOST POPULAR FILMS (10) BY IMDBRATING
                .then(response => response.json())
                .then(data => {
                    if (data.Response === 'True') {
                        for (let i = 0; i < data.Search.length; i++) {
                            fetch(urlBase + '&i=' + data.Search[i].imdbID)
                                .then(response => response.json())
                                .then(data => {
                                    commit('addPopularFilm', data);
                                    console.log(data);
                                }).catch(error => console.log(error));
                        }
                        //commit('setMostPopularFilms', data.Search);
                        //console.log(data);
                    } else {
                if (data.Search != undefined && data.Search.length === 0) {
                    commit('setMostPopularFilms', []);
                    console.log('No films available');
                }
            }
                }).catch(error => console.log(error));
        },
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
                        for (let i = 0; i < data.Search.length; i++) {
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
                        if (data.Search != undefined && data.Search.length === 0) {
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
        /*
        setMostPopularFilms(state, mostPopularFilms) {
            state.mostPopularFilms = mostPopularFilms;
        },
            addFilms(state, films) {
                const array = state.films.concat(films);
                state.films = array;
            },
        */
        addFilm(state, film) {
            state.films[state.films.length] = film;
        },
        addPopularFilm(state, popularFilm) {
            state.mostPopularFilms[state.mostPopularFilms.length] = popularFilm;
        }
    },
    getters: {
        getFilms(state) {
            return state.films
        },
        getMostPopularFilms(state) {
            return state.mostPopularFilms
        }
    }
}