import axiosClient from "./axios";

export function getDashDetails(userId){
    return axiosClient.get('dashboard/user'+userId+'.json');
}