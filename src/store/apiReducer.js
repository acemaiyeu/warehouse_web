// store/apiReducer.js
const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default function apiReducer(state = initialState, action) {
  switch (action.type) {
    case "api/fetchStart":
      return { ...state, loading: true, error: null };
    case "api/fetchSuccess":
      return { ...state, loading: false, data: action.payload };
    case "api/fetchError":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// Action creator (dùng thunk để call API)
export const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: "api/fetchStart" });
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      dispatch({ type: "api/fetchSuccess", payload: data });
    } catch (err) {
      dispatch({ type: "api/fetchError", payload: err.message });
    }
  };
};
