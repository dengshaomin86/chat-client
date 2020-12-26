import moment from "moment";
import {mapState} from "vuex";

export default {
  computed: {
    baseURL() {
      return process.env.VUE_APP_URL;
    },
    ...mapState({
      username: state => state.personal.username,
      userId: state => state.personal.userId,
      avatar: state => state.personal.avatar,
    })
  },
  filters: {
    formatDate(data, pattern = "YYYY/MM/DD, HH:mm:ss") {
      data = Number(data);
      return moment(Number(data)).format(pattern);
    },
  },
};
