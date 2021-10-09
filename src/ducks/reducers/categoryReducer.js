const initialState = {
  categories: [],
  category: null,
  loading: false,
  deleteLoading: false,
};

export function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case "CATEGORIES_DELETE_LOADING":
      return {
        ...state,
        deleteLoading: action.payload,
      };
    case "CATEGORIES_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "CATEGORIES_SUCCESS":
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case "CATEGORY_SUCCESS":
      return {
        ...state,
        category: action.payload,
      };
    case "CATEGORIES_FAIL":
      return {
        ...state,
        loading: false,
      };
    case "CATEGORIES_RESET":
      return {
        ...state,
        loading: false,
        categories: [],
        category: null,
        deleteLoading: false,
      };
    default:
      return state;
  }
}
