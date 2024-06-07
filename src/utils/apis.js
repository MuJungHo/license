export const getToken = ({ account = "", password = "" } = {}) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (account === "Admin" && password === "123456") {
      resolve("666666666");
    } else {
      reject("帳號或密碼錯誤")
    }
  }, 1000);
});
