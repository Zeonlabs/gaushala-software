import { employee } from "../js/actions";
import { fetchUrl } from "../js/fetchUrl";
import { Setting } from "../js/apiList";

export const addUser = data => dispatch =>
  new Promise((resolve, reject) => {
    console.log("data", data);
    fetchUrl(Setting.addUser.method, Setting.addUser.url, data, false, false)
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("e", e);
        reject(e);
      });
  });

export const editUser = data => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl(Setting.editUser.method, Setting.editUser.url, data)
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("e", e);
        reject(e);
      });
  });

export const getOtp = () => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl(Setting.getOtp.method, Setting.getOtp.url)
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("e", e);
        reject(e);
      });
  });

export const sendSms = data => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl(Setting.sendSms.method, Setting.sendSms.url, data)
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("e", e);
        reject(e);
      });
  });

export const loginUser = data => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl(Setting.loginUser.method, Setting.loginUser.url, data)
      .then(res => {
        // console.log("res,status", stus.responce.status);
        resolve(res);
      })
      .catch(e => {
        console.log("e", e);
        reject(e);
      });
  });
export const resetPin = data => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl(Setting.resetPin.method, Setting.resetPin.url, data)
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("e", e);
        reject(e);
      });
  });

export const valiDateOtp = data => dispatch =>
  new Promise((resolve, reject) => {
    fetchUrl(Setting.validateOtp.method, `${Setting.validateOtp.url}${data}`)
      .then(res => {
        // console.log(
        //   "resjasdgjhhhhhhhhhhhh____________+++++++++++++++++++++++==",
        //   res
        // );
        resolve(res);
      })
      .catch(e => {
        console.log("e", e);
        reject(e);
      });
  });

// export const getEmployee = id => dispatch =>
//   new Promise((resolve, reject) => {
//     // console.log("TCL: data", id);
//     fetchUrl(
//       employeeList.employeeListing.method,
//       employeeList.employeeListing.url,
//       id
//     )
//       .then(res => {
//         console.log("DeadAnimal -> res ->", res);
//         dispatch({ type: employee.employeesting, payload: res.docs });
//         resolve(res);
//       })
//       .catch(e => {
//         reject(e);
//       });
//   });

// // export const getEmployee = data => dispatch =>
// //   new Promise((resolve, reject) => {
// //     fetchUrl(
// //       employeeList.employeeListing.method,
// //       employeeList.employeeListing.url,
// //       data
// //     )
// //       .then(res => {
// //         dispatch({ type: employee.employeesting, payload: res.docs });
// //         resolve(res);
// //       })
// //       .catch(e => {
// //         reject(e);
// //       });
// //   });

// export const getEmployeeFilter = data => dispatch =>
//   new Promise((resolve, reject) => {
//     fetchUrl(
//       employeeList.employeeListingFilter.method,
//       employeeList.employeeListingFilter.url,
//       data
//     )
//       .then(res => {
//         resolve(res);
//       })
//       .catch(e => {
//         reject(e);
//       });
//   });

// export const getEmployeeDocs = data => dispatch =>
//   new Promise((resolve, reject) => {
//     fetchUrl(
//       employeeList.employeeGetDocs.method,
//       `${employeeList.employeeGetDocs.url}/${data}`
//     )
//       .then(res => {
//         resolve(res);
//       })
//       .catch(e => {
//         reject(e);
//       });
//   });

// export const editEmployee = (id, data) => dispatch =>
//   new Promise((resolve, reject) => {
//     fetchUrl(
//       employeeList.employeeUpdate.method,
//       `${employeeList.employeeUpdate.url}/${id}`,
//       data
//     )
//       .then(res => {
//         resolve(res);
//       })
//       .catch(e => {
//         reject(e);
//       });
//   });

// export const deleteEmployee = data => dispatch =>
//   new Promise((resolve, reject) => {
//     fetchUrl(
//       employeeList.employeeDelete.method,
//       employeeList.employeeDelete.url,
//       data
//     )
//       .then(res => {
//         resolve(res);
//       })
//       .catch(e => {
//         reject(e);
//       });
//   });
