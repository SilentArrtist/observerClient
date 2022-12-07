import {$host} from "./index";

export const addImage = async (file) => {
    const formData = new FormData();
    formData.append('file',file);
    const {data} = await $host.post('api/file/addImg',formData,{
        headers: {
            'Content-Type': 'mulpipart/form-data'
        }
      })
    return data
}
export const deleteImage = async (name) => {
    const {data} = await $host.post('api/file/deleteIMG', {name})
    return data
}
export const getImages = async () => {
    const {data} = await $host.get('api/file/getImages')
    return data
}
export const reset= async () => {
    const data = await $host.get('api/file/reset')
    return data
}


