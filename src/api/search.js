import axiosClient from "./axios";

export function getSearchResult(searchText){
    return axiosClient.get('search/'+searchText+'.json');
}