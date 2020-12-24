import moment from "moment";
import storage from "@/utils/storage";

export default {
  computed: {
    username() {
      return storage.local.get("username");
    },
    avatar() {
      return storage.local.get("avatar");
    }
  },
  filters: {
    formatDate(data, pattern = "YYYY/MM/DD, HH:mm:ss") {
      data = Number(data);
      return moment(Number(data)).format(pattern);
    },
  },
};
