export const searchModule = {
    namespaced: true,
    state: () => ({
        query: '',
        genders: [],
        numberOfGenders: 0
    }),
    mutations: {
        addGender(state, gender) {
            state.genders[state.numberOfGenders++] = gender;
            /*
            if (state.numberOfGenders === 0)
                state.genders[state.numberOfGenders++] = gender;
            else {
                let canAdd = true;
                for (let i=0; i < state.genders.length; i++)
                    if (state.genders[i] === gender)
                        canAdd = false;
                if (canAdd)
                    state.genders[state.numberOfGenders++] = gender;
            }
             */
        },
        removeGender(state, gender) {
            let indexToRemove, index = 0;
            state.genders.map(g => g===gender ? indexToRemove = index : index++);
            state.genders[indexToRemove] = state.genders[state.genders.length-1];
        },
        setQuery(state, query) {
            state.query = query
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