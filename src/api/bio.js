import axiosClient from "./axios";

export function getBioDetails(artistId){
    return axiosClient.get('Bio/artist'+artistId+'.json');
}