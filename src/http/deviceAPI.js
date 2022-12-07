import {$host} from "./index";

export const addDevice = async (ip) => {
    const {data} = await $host.post('api/modbus/create', {ip})
    return data
}
export const deleteDevice = async (ip) => {
    const {data} = await $host.post('api/modbus/delete', {ip})
    return data
}
export const getDevices = async () => {
    const {data} = await $host.get('api/modbus/get/data')
    return data
}
export const changeValue = async (ip,tagName,tagIndex,tagValue) => {
    const {data} = await $host.post('api/modbus/change/value', {ip,tagName,tagIndex,tagValue})
    return data
}
export const setSave = async (elements,settings) => {
    const {data} = await $host.post('api/modbus/set/save', {elements,settings})
    return data
}
export const getSave = async () => {
    const data = await $host.get('api/modbus/get/save')
    return data
}
export const setPollingSettings = async (settings) => {
    const {data} = await $host.post('api/modbus/set/pollingSettings', {settings})
    return data
}
export const getPollingSettings = async () => {
    const {data} = await $host.get('api/modbus/get/pollingSettings')
    return data
}

