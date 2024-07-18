import axios from 'axios';
const md5 = require("md5");

const host = process.env.NODE_ENV === 'production' ? "" : `http://${process.env.REACT_APP_HOST}`;

// let errorCount = 0;

export const instance = axios.create({
  baseURL: `${host}/cgi-bin`,
  timeout: 30000
});

const Promise_ = (instance_) => {
  return new Promise((response, reject) => {
    instance_
      .then((data) => {
        response(data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const getKey = async ({ timestamp }) => Promise_(instance.get('/system', {
  params: {
    action: 'getKey',
    timestamp
  }
}))

export const tokenlogin = ({ timestamp, credentials }) => Promise_(instance.get('/system', {
  params: {
    action: 'tokenlogin',
    timestamp,
    credentials
  }
}))

export const resetPassword = ({ data, timestamp }) => Promise_(instance.post('/system', data, { params: { action: 'reset_password', timestamp } }))

export const api = (token, logout) => {
  const timestamp = Date.now();
  const sign = md5(timestamp + '#' + token);
  const promise_ = (instance_) => {
    return new Promise((response, reject) => {
      instance_
        .then((data) => {
          response(data.data);
        })
        .catch((error) => {
          const json = JSON.parse(error.response.statusText);
          if (json.code === 400124) {
            logout();
          }
        })
    })
  }
  return {
    tokenLogout: () => promise_(instance.get('/system', { params: { action: 'tokenlogout', timestamp, sign } })),
    getLicenseTransactionList: ({ data, ...rest }) => promise_(instance.post('/db/license/transaction/list', { ...data }, { params: { sign, timestamp, ...rest } })),
    getAccountInfo: ({ ...rest }) => promise_(instance.get('/db/account/get', { params: { timestamp, sign, ...rest } })),
    getAccountList: ({ data, ...rest }) => promise_(instance.post('/db/account/list', { ...data }, { params: { sign, timestamp, ...rest } })),
    postAddAccount: ({ data, ...rest }) => promise_(instance.post('/db/account/add', { ...data }, { params: { sign, timestamp, ...rest } })),

    getProductList: ({ data, ...rest }) => promise_(instance.post('/db/product/list', { ...data }, { params: { sign, timestamp, ...rest } })),
    getProduct: ({ ...rest }) => promise_(instance.get('/db/product/get', { params: { timestamp, sign, ...rest } })),
    editProduct: ({ data, ...rest }) => promise_(instance.post('/db/product/edit', { ...data }, { params: { timestamp, sign, ...rest } })),

    postLicenseBind: ({ data, ...rest }) => promise_(instance.post('/db/license/bind', { ...data }, { params: { sign, timestamp, ...rest } })),
    getLicenseDownload: ({ ...rest }) => promise_(instance.get('/db/license/download', { params: { sign, timestamp, ...rest } })),




  }
}