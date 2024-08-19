import moment from "moment";
import { mapState } from "vuex";
import axios from "./axios.js";

export default {
  computed: {
    baseURL() {
      return axios.defaults.baseURL;
    },
    ...mapState({
      username: (state) => state.personal.username,
      userId: (state) => state.personal.userId,
      avatar: (state) => state.personal.avatar,
    }),
  },
  filters: {
    formatDate(data, pattern = "YYYY/MM/DD, HH:mm:ss") {
      data = Number(data);
      return moment(Number(data)).format(pattern);
    },
  },
};
