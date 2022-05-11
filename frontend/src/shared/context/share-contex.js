import { createContext } from 'react';

export const ShareContext = createContext({
    date_ranges : [],
    city:null,
    car: [],
    brand:'Audi',
    options:[],
    services:[],
    error: false,
    selectedCar: {},
    notFound:false
});