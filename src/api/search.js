import axiosClient from "./axios";

export function getSearchResult(id){
    return axiosClient.get('search/'+id+'.json');
}