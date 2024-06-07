export const getAccountInfo = ({ account = "", password = "" } = {}) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (account === "Admin" && password === "123456") {
      resolve({ token: "Admin", role: 1 });
    } if (account === "Operator" && password === "123456") {
      resolve({ token: "Operator", role: 2 });
    } if ((account === "UserA" || account === "UserB") && password === "123456") {
      resolve({ token: "User", role: 3 });
    } else {
      reject("帳號或密碼錯誤")
    }
  }, 500);
});
