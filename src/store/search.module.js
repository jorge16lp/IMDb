export const searchModule = {
    namespaced: true,
    state: () => ({
        query: '',
        genders: ['', '', '', '', '', ''],
        releaseYear: 2000,
        actors: []
    }),
    mutations: {
        setQuery(state, query) {
            state.query = query
        },
        resetFilters(state) {
            state.query = '';
            state.genders = ['', '', '', '', '', ''];
            state.releaseYear = 2000;
            state.actors = [];
        },
        addGender(state, gender) {
            let numberOfGenders = 0;
            while (!(state.genders[numberOfGenders] === ''))
                numberOfGenders++;
            state.genders[numberOfGenders] = gender;
        },
        removeGender(state, gender) {
            for (let i=0; i < state.genders.length; i++)
                if (state.genders[i]===gender) {
                    state.genders[i] = state.genders[state.genders.length-1];
                    state.genders[state.genders.length-1] = '';
                }
        },
        setReleaseYear(state, year) {
            state.releaseYear = year;
        },
        addActor(state, actor) {
            state.actors[state.actors.length] = actor;
        },
        removeActor(state, actor) {
            for (let i=0; i < state.actors.length; i++)
                if (state.actors[i]===actor) {
                    state.actors.splice(i, 1);
                }
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
        }
    }
}