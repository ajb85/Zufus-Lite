//const url = "./worldStateData.json"; //Use for Local Testing!
const url = "wfWS_Proxy.php" //Use for live version
const fetchData = {
  method: "GET",
  cache: "no-cache"
};
export default function worldStateFetch(){
  return fetch(url, fetchData)
    .then(res => res.json())
    .then(function(data){return data});
}
