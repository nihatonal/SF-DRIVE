import { createContext } from 'react';

export const ShareContext = createContext({
    date_ranges : [],
    city:null,
    car: [],
    options:[],
    services:[],
    error: false
});