import axiosClient from "./axios";

export function getLyrics(songId){
    return axiosClient.get('lyrics/'+songId+'.json');
}