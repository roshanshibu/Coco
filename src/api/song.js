import axiosClient from "./axios";

export function getSongDetails(songId){
    return axiosClient.get('songData/'+songId+'.json');
}