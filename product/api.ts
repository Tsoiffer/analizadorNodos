import axios from "axios";
import Papa from "papaparse"
import {Product} from "./types";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    list: async (): Promise<Product[]> => {
        return axios.get(
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vSNkxekxOJEUSyCz8mw54AgXFt_HOF6xAE5Ij7KvS17PVI-4xld7kV7s0d9k73QjOeCLzr9cEphBh3D/pub?output=csv',
            {
                responseType: 'blob'
            },
            ).then((response) => {
                return new Promise<Product[]>((resolve, reject) => {
                    Papa.parse(response.data, {
                        header: true,
                        complete: (results) => {
                            return resolve(results.data as Product[]);
                        },
                        error: (error) => {
                            return reject(error.message);
                        },
                    });
                });
            });
    },
};