import { actionName, listing, animal } from "../js/actions";

const Test = (
  state = {
    apicall: false,
    apistatus: false,
    incomeList: {} || null,
    sumTotal: 0,
    expenseSumTotal: 0,
    incomeTotal: 0,
    expenseList: [],
    expenseTotal: 0,
    trustMembers: [] || null,
    trustTotal: 0,
    chequeList: [] || null,
    chequeTotal: 0,
    noteList: [] || null,
    totalAnimalCount: 0 || null,
    printComponentData:
      {
        data: {
          slip_no: 0,
          name: "",
          date: "",
          address: "",
          cheque_no: "",
          phone: "",
          ref_name: "",
        },
        itemData: "",
        finalTotal: 0,
      } || null,
  },
  Action
) => {
  switch (Action.type) {
    case actionName.apisuccess:
      return {
        ...state,
        apicall: false,
        apistatus: false,
      };

    case listing.incomeListing:
      return {
        ...state,
        incomeList: Action.payload,
      };

    case listing.storeTotal:
      return {
        ...state,
        sumTotal: Action.payload,
      };

    case listing.allDataForPrint:
      return {
        ...state,
        printComponentData: Action.payload,
      };

    case listing.storeExpenseTotal:
      return {
        ...state,
        expenseSumTotal: Action.payload,
      };

    case listing.incomeTotal:
      return {
        ...state,
        incomeTotal: Action.payload,
      };
    case listing.expenseTotal:
      return {
        ...state,
        expenseTotal: Action.payload,
      };
    case listing.trustMembers:
      return {
        ...state,
        trustTotal: Action.payload,
      };
    case listing.chequeTotal:
      return {
        ...state,
        chequeTotal: Action.payload,
      };

    case listing.expenseListing:
      return {
        ...state,
        expenseList: Action.payload,
      };
    case listing.trustMembersListing:
      return {
        ...state,
        trustMembers: Action.payload,
      };
    case listing.chequeListing:
      return {
        ...state,
        chequeList: Action.payload,
      };
    case listing.noteListing:
      return {
        ...state,
        noteList: Action.payload,
      };
    case animal.totalAnimalCount:
      return {
        ...state,
        totalAnimalCount: Action.payload,
      };

    default:
      return state;
  }
};

export default Test;
