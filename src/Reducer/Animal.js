import { animal, employee } from "../js/actions";

const animals = (
  state = {
    incomeAnimalList: [] || null,
    deadAnimalList: [] || null,
    getAnimalList: [] || null,
    costAnimalList: [] || null,
    totalAnimalList: [] || null,
    employeeListing: [] || null,
    incomeAnimalTotal: 0,
    deadAnimalTotal: 0,
    getAnimalTotal: 0,
    costAnimalTotal: 0,
    totalAnimalTotal: 0,
    employeeTotal: 0
  },
  action
) => {
  switch (action.type) {
    case animal.incomeAnimalsting:
      return {
        ...state,
        incomeAnimalList: action.payload
      };
    case animal.deadAnmimalList:
      return {
        ...state,
        deadAnimalList: action.payload
      };
    case animal.givenAnmimalList:
      return {
        ...state,
        getAnimalList: action.payload
      };
    case animal.costAnmimalList:
      return {
        ...state,
        costAnimalList: action.payload
      };
    case animal.totalAnmimalList:
      return {
        ...state,
        totalAnimalList: action.payload
      };
    case employee.employeesting:
      return {
        ...state,
        employeeListing: action.payload
      };
    case animal.incomeAnimalTotal:
      return {
        ...state,
        incomeAnimalTotal: action.payload
      };
    case animal.costAnimalTotal:
      return {
        ...state,
        costAnimalTotal: action.payload
      };
    case animal.deadAnimalTotal:
      return {
        ...state,
        deadAnimalTotal: action.payload
      };
    case animal.givenAnimalTotal:
      return {
        ...state,
        getAnimalTotal: action.payload
      };
    case animal.totalAnimalTotal:
      return {
        ...state,
        totalAnimalTotal: action.payload
      };
    case employee.employeeCount:
      return {
        ...state,
        employeeTotal: action.payload
      };

    default:
      return state;
  }
};

export default animals;
