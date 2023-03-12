import axiosClient from "./axios";

export function getChorusPage(pageNumber){
    return axiosClient.get('chorus/'+pageNumber+'.json');
}