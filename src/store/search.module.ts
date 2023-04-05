import {Module} from "vuex";
import {SearchState} from '@vue/runtime-core';

declare module '@vue/runtime-core' {
    interface SearchState {
        query: string,
        genders: string[],
        releaseYear: number,
        duration: number,
        actors: string[],
        directors: string[]
    }
}

export const searchModule: Module<SearchState, any> = {
    namespaced: true,
    state: () => ({
        query: '',
        genders: [],
        releaseYear: 2000,
        duration: 0,
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
        addGender(state: SearchState, gender) {
            state.genders[state.genders.length] = gender;
        },
        removeGender(state: SearchState, gender) {
            for (let i=0; i < state.genders.length; i++)
                if (state.genders[i]===gender)
                    state.genders.splice(i, 1);
        },
        setReleaseYear(state: SearchState, year) {
            state.releaseYear = parseInt(year);
        },
        setDuration(state: SearchState, duration) {
            state.duration = parseInt(duration);
        },
        addActor(state: SearchState, actor) {
            state.actors[state.actors.length] = actor;
        },
        removeActor(state: SearchState, actor) {
            for (let i=0; i < state.actors.length; i++)
                if (state.actors[i]===actor)
                    state.actors.splice(i, 1);
        },
        addDirector(state: SearchState, director) {
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
        getDuration(state) {
            return state.duration
        },
        getActors(state) {
            return state.actors
        },
        getDirectors(state) {
            return state.directors
        }
    }
}