import axios from "axios";
import Vue from "vue";

export default() => {
  return axios.create({
    baseURL: 'http://localhost:5001',
    // headers: {"Authorization": "Bearer " + Vue.ls.get("jwt", "")}
  })
}
