import {createStore} from "vuex";
import {searchModule} from "./search.module";
import {filmsModule} from "./films.module";

export const store = createStore({
    modules: {
        search: searchModule,
        films: filmsModule
    }
})