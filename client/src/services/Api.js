import axios from "axios";
import Vue from "vue";

export default() => {
  return axios.create({
    baseURL: process.env.API_ROOT
  })
}
