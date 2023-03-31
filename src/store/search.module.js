export const searchModule = {
    namespaced: true,
    state: () => ({
        query: '',
        genders: [],
        releaseYear: 2000,
        actors: [],
        directors: []
    }),
    mutations: {
        setQuery(state, query) {
            state.query = query
        },
        resetFilters(state) {
            state.query = '';
            state.genders = [];
            state.releaseYear = 2000;
            state.actors = [];
        },
        addGender(state, gender) {
            state.genders[state.genders.length] = gender;
        },
        removeGender(state, gender) {
            for (let i=0; i < state.genders.length; i++)
                if (state.genders[i]===gender)
                    state.genders.splice(i, 1);
        },
        setReleaseYear(state, year) {
            state.releaseYear = year;
        },
        addActor(state, actor) {
            state.actors[state.actors.length] = actor;
        },
        removeActor(state, actor) {
            for (let i=0; i < state.actors.length; i++)
                if (state.actors[i]===actor)
                    state.actors.splice(i, 1);
        },
        addDirector(state, director) {
            state.directors[state.directors.length] = director;
        },
        removeDirector(state, director) {
            for (let i=0; i < state.directors.length; i++)
                if (state.directors[i]===director)
                    state.directors.splice(i, 1);
        }
    },
    getters: {
        getQuery(state) {
            return state.query
        },
        getGenders(state) {
            return state.genders
        },
        getReleaseYear(state) {
            return state.releaseYear
        },
        getActors(state) {
            return state.actors
        },
        getDirectors(state) {
            return state.directors
        }
    }
}