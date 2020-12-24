// 本地存储
const base64 = {
  encrypt(data) {
    return data;
  },
  decrypt(data) {
    return data;
  }
};

class Storage {
  constructor(storage) {
    this.storage = storage;
    this.name = `${process.env.VUE_APP_NAME || "NO_NAME"}-app-info`;
  }

  set({label, value, type}) {
    if (!label) {
      console.error("label为必填字段");
      return;
    }
    if (label === "data_user") {
      console.error("data_user为关键字，请勿用");
      return;
    }
    const data = this.get() || {};
    try {
      delete data[label];
      delete data.data_user[label];
    } catch (e) {
    }
    let itemValue = {};
    // type 为 user，切换用户时自动清除
    if (type === "user") {
      if (!data.data_user) data.data_user = {};
      itemValue = {
        data: {
          ...data,
          data_user: {
            ...data.data_user,
            [label]: value
          }
        }
      };
    } else {
      itemValue = {
        data: {
          ...data,
          [label]: value
        }
      };
    }
    this.storage.setItem(this.name, base64.encrypt(JSON.stringify(itemValue)));
  }

  get(label) {
    const info = this.storage.getItem(this.name);
    if (!info) return null;
    const data = JSON.parse(base64.decrypt(info)).data;
    if (!label) return data;
    return data[label] || (data.data_user && data.data_user[label]);
  }

  remove(label, e) {
    if (!label) return;
    if (label === "data_user" && e !== "sure") return;
    const info = this.storage.getItem(this.name);
    if (!info) return;
    const data = JSON.parse(base64.decrypt(info)).data;
    delete data[label];
    data.data_user && delete data.data_user[label];
    const itemValue = {
      data: {
        ...data,
      }
    };
    this.storage.setItem(this.name, base64.encrypt(JSON.stringify(itemValue)));
  }

  // 删除用户数据
  removeUser() {
    this.remove("data_user", "sure");
  }

  clear() {
    this.storage.remove(this.name);
  }
}

const storage = {
  local: new Storage(localStorage),
  session: new Storage(sessionStorage),
};

export default storage;
