import { actionName, listing } from "../js/actions";
import { fetchUrl } from "../js/fetchUrl";

const loadData = (values) => {
  // console.log("this is a data from the action values",values);
  return {
    type: actionName.apisuccess,
    values,
  };
};

export const loadDatas = () => (dispatch) =>
  new Promise((resolve, reject) => {
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "Post" : "get",
      `api/link/afterurl`
    )
      .then((res) => {
        dispatch(loadData(res));
        // notification.success({ message: "Sorting added sucessfully !" });
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

// export const loadPostData = data => dispatch =>
//   new Promise((resolve, reject) => {
//     fetchUrl("post", "url", data)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(e => {
//         reject(e);
//       });
//   });
export const addIncome = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", data);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "get" : "post",
      "/income/add",
      data
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const getExpense = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "Post" : "get",
      `/expense`,
      id
    )
      .then((res) => {
        dispatch({ type: listing.expenseListing, payload: res.docs });
        dispatch({ type: listing.expenseTotal, payload: res });
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const getIncome = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "Post" : "get",
      `/income`,
      id
    )
      .then((res) => {
        // console.log("res", res);
        dispatch({ type: listing.incomeListing, payload: res.docs });
        dispatch({ type: listing.incomeTotal, payload: res });
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const storeSum = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch({ type: listing.storeTotal, payload: data });
  });

export const expenseStoreSum = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch({ type: listing.storeExpenseTotal, payload: data });
  });

export const printDataStore = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch({ type: listing.allDataForPrint, payload: data });
  });

export const getFilterIncome = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", data);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "Post" : "get",
      `/income/filter`,
      data
    )
      .then((res) => {
        dispatch({ type: listing.incomeListing, payload: res });
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const getFilterExpense = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", data);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "Post" : "get",
      `/expense/filter`,
      data
    )
      .then((res) => {
        dispatch({ type: listing.expenseListing, payload: res.docs });
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const addExpense = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", data);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "get" : "post",
      "/expense/add",
      data
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const editExpense = (id, data) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "Post" : "PATCH",
      `/expense/edit/${id}`,
      data
    )
      .then((res) => {
        // console.log("res-> edit expense res ->", res);

        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const editIncome = (id, data) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "Post" : "Patch",
      `/income/edit/${id}`,
      data
    )
      .then((res) => {
        // console.log("res-> edit income res ->", res);
        // getIncome()
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const deleteIncome = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "Post" : "DEleTE",
      `/income/delete/${id}`
    )
      .then((res) => {
        // console.log("res-> edit income res ->", res);
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });

export const deleteExpense = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    // console.log("TCL: data", id);
    fetchUrl(
      localStorage.getItem("reversePin") === "205" ? "Post" : "delete",
      `/expense/delete/${id}`
    )
      .then((res) => {
        // console.log("res-> edit income res ->", res);
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
