import {Store} from 'vuex';

const createStore = () => {
    return new Store({
        strict: process.env.NODE_ENV !== 'production',
    });
};

export default createStore;
