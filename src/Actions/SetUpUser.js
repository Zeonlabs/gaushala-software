// import { employee } from "../js/actions";
import { fetchUrl } from "../js/fetchUrl";
import { Setting } from "../js/apiList";
import { employee } from "../js/actions";

export const addUser = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("data", data);
    fetchUrl(Setting.addUser.method, Setting.addUser.url, data, false, false)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        // console.log("e", e);
        reject(e);
      });
  });

export const editUser = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    fetchUrl(Setting.editUser.method, Setting.editUser.url, data)
      .then((res) => {
        // console.log("res", res);
        dispatch({ type: employee.userName, payload: res });
        resolve(res);
      })
      .catch((e) => {
        // console.log("e", e);
        reject(e);
      });
  });

export const getOtp = () => (dispatch) =>
  new Promise((resolve, reject) => {
    fetchUrl(Setting.getOtp.method, Setting.getOtp.url)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        // console.log("e", e);
        reject(e);
      });
  });

export const sendSms = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    fetchUrl(Setting.sendSms.method, Setting.sendSms.url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        // console.log("e", e);
        reject(e);
      });
  });

export const loginUser = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    fetchUrl(Setting.loginUser.method, Setting.loginUser.url, data)
      .then((res) => {
        // console.log("res,status", stus.responce.status);
        resolve(res);
      })
      .catch((e) => {
        // console.log("e", e);
        reject(e);
      });
  });
export const resetPin = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    fetchUrl(Setting.resetPin.method, Setting.resetPin.url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        // console.log("e", e);
        reject(e);
      });
  });

export const valiDateOtp = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    fetchUrl(Setting.validateOtp.method, `${Setting.validateOtp.url}${data}`)
      .then((res) => {
        // console.log(
        //   "resjasdgjhhhhhhhhhhhh____________+++++++++++++++++++++++==",
        //   res
        // );
        resolve(res);
      })
      .catch((e) => {
        // console.log("e", e);
        reject(e);
      });
  });

export const getAmountReport = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "Post" : "get",
      `/inex/report`,
      data
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
