export const searchModule = {
    namespaced: true,
    state: () => ({
        query: '',
        genders: ['', '', '', '', ''],
        releaseYear: 2000
    }),
    mutations: {
        setQuery(state, query) {
            state.query = query
        },
        resetFilters(state) {
            state.query = '';
            state.genders = ['', '', '', '', ''];
            state.releaseYear = 2000;
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
        }
    },
    getters: {
        getGenders(state) {
            return state.genders
        },
        getQuery(state) {
            return state.query
        }
    }
}