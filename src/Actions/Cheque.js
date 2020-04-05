import { listing } from "../js/actions";
import { fetchUrl } from "../js/fetchUrl";
// import apiList from "../js/apiList";

export const getCheque = id => dispatch =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "Post" : "get",
      `/cheque`,
      id
    )
      .then(res => {
        dispatch({ type: listing.chequeListing, payload: res.docs });
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });

export const addCheque = data => dispatch =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", data);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "get" : "post",
      `/cheque/add`,
      data
    )
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });

export const editCheque = (id, data) => dispatch =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "Post" : "patch",
      `/cheque/edit/${id}`,
      data
    )
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });

export const deleteCheque = id => dispatch =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "Post" : "delete",
      `/cheque/delete/${id}`
    )
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });

export const filterCheque = id => dispatch =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "Post" : "get",
      `/cheque/filter`,
      id
    )
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });
