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
        setQuery(state: SearchState, query: string): void {
            state.query = query;
        },
        resetFilters(state: SearchState): void {
            state.query = '';
            state.genders = [];
            state.releaseYear = 2000;
            state.actors = [];
        },
        addGender(state: SearchState, gender: string): void {
            state.genders[state.genders.length] = gender;
        },
        removeGender(state: SearchState, gender: string): void {
            for (let i=0; i < state.genders.length; i++)
                if (state.genders[i]===gender)
                    state.genders.splice(i, 1);
        },
        setReleaseYear(state: SearchState, year: string): void {
            state.releaseYear = parseInt(year);
        },
        setDuration(state: SearchState, duration: string): void {
            state.duration = parseInt(duration);
        },
        addActor(state: SearchState, actor: string): void {
            state.actors[state.actors.length] = actor;
        },
        removeActor(state: SearchState, actor: string): void {
            for (let i=0; i < state.actors.length; i++)
                if (state.actors[i]===actor)
                    state.actors.splice(i, 1);
        },
        addDirector(state: SearchState, director: string): void {
            state.directors[state.directors.length] = director;
        },
        removeDirector(state: SearchState, director: string): void {
            for (let i=0; i < state.directors.length; i++)
                if (state.directors[i]===director)
                    state.directors.splice(i, 1);
        }
    },
    getters: {
        getQuery(state: SearchState): string {
            return state.query
        },
        getGenders(state: SearchState): string[] {
            return state.genders
        },
        getReleaseYear(state: SearchState): number {
            return state.releaseYear
        },
        getDuration(state: SearchState): number {
            return state.duration
        },
        getActors(state: SearchState): string[] {
            return state.actors
        },
        getDirectors(state: SearchState): string[] {
            return state.directors
        }
    }
}