import axios from 'axios'
axios.defaults.baseURL="https://countriesnow.space/api/v0.1/countries";
const getCountries=async()=>{
    const url="/positions";
    return await axios.get(url);
}
const getStates=async(country )=>{
    const url=`/states/q?country=${country}`
    return await axios.get(url)
}
export{
    getCountries,getStates
}