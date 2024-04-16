import { defineStore } from "pinia";
import axios from "axios";

const key = "LIVDSRZULELA";
const url = "https://g.tenor.com/v1/";

export const useGifStore = defineStore("gif", {
  state: () => ({
    gif: [],
    gifTag: [],
  }),
  actions: {
    async fetchGif(query = "excited") {
      try {
        const response = await axios.get(`${url}search?q=${query}&key=${key}`);
        this.gif = response.data.results;
      } catch (error) {
        console.error("Error fetching gif:", error);
      }
    },
    async fetchGifTag() {
      try {
        const response = await axios.get(`${url}tags?key=${key}`);
        this.gifTag = response.data.tags;
      } catch (error) {
        console.error("Error fetching gif tags:", error);
      }
    },
  },
});
