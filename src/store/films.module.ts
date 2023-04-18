let page = 1;
let lastSearch = '';
const apiKey = '1e2b02ee58a238852259806ff75ef034';
const urlBase = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey;
export const filmsModule = {
    namespaced: true,
    state: () => ({
        films: [],
        mostPopularFilms: [],
        topRatedFilms: [],
        nowPlayingFilms: [],
        byReleaseYearFilms: []
    }),
    actions: {
        async fetchFilmsByReleaseYear({commit}, rel_year) {
            let minYear = parseInt(rel_year) - 2;
            let maxYear = parseInt(rel_year) + 2;
            let url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey
                + '&primary_release_date.gte=' + minYear + '&primary_release_date.lte=' + maxYear;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    commit('addFilmsByReleaseYear', data.results);
                    console.log(data);
                }).catch(error => console.log(error));
/*
            fetch(url + 'page')
                .then(response => response.json())
                .then(data => {
                    if (page <= data.total_pages) {
                        commit('addFilms', data.results);
                        //console.log(data);
                    }
                }).catch(error => console.error(error));

 */
        },
        async fetchSortedFilms({commit}) {
            // MOST POPULAR FILMS
            let url = 'https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    commit('setMostPopularFilms', data.results);
                    console.log(data);
                }).catch(error => console.log(error));

            // TOP RATED FILMS
            url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    commit('setTopRatedFilms', data.results);
                    console.log(data);
                }).catch(error => console.log(error));

            // NOW PLAYING FILMS
            url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + apiKey;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    commit('setNowPlayingFilms', data.results);
                    console.log(data);
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

            if (!(searchText === '')) {
                fetch(urlBase + '&query=' + searchText
                    + '&page=' + page)
                    .then(response => response.json())
                    .then(data => {
                        if (page <= data.total_pages) {
                            commit('addFilms', data.results);
                            //console.log(data);
                        }
                    }).catch(error => console.error(error));
            } else {
                commit('setFilms', []);
            }
        }
    },
    mutations: {
        setFilms(state, films) {
            state.films = films
        },
        setMostPopularFilms(state, mostPopularFilms) {
            state.mostPopularFilms = mostPopularFilms;
        },
        setTopRatedFilms(state, topRatedFilms) {
            state.topRatedFilms = topRatedFilms;
        },
        setNowPlayingFilms(state, nowPlayingFilms) {
            state.nowPlayingFilms = nowPlayingFilms;
        },
        addFilms(state, films) {
            state.films = state.films.concat(films);
        },
        addFilmsByReleaseYear(state, films) {
            state.byReleaseYearFilms = films;
        }
    },
    getters: {
        getFilms(state) {
            return state.films
        },
        getFilmsByReleaseYear(state) {
            return state.byReleaseYearFilms
        },
        getMostPopularFilms(state) {
            return state.mostPopularFilms
        },
        getTopRatedFilms(state) {
            return state.topRatedFilms
        },
        getNowPlayingFilms(state) {
            return state.nowPlayingFilms
        }
    }
}