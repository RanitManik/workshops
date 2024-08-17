import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators
} from "redux";

// Componse is used to call several enhancer in a row =>

/*
const makeLouder = string => string.toUpperCase();
const repeatThreeTimes = string => string.repeat(3);
const embolden = string => string.bold();

const makeLouderRepeatThreeTimesAndEmbolden = compose(embolden, repeatThreeTimes, makeLouder);

const makeLouderRepeatThreeTimesAndEmboldenResult = (makeLouderRepeatThreeTimesAndEmbolden("Hello"));

document.querySelector("#app").innerHTML = `
    <h1>
    ${makeLouderRepeatThreeTimesAndEmboldenResult}
    </h1>
`;
*/

// reducer is used for code splitting => 

const initialState = { value: 0 };

const INCREMENT = "INCREMENT";
const ADD = "ADD";

const incrementAction = { type: INCREMENT, payload: 5 };

// action creater (Function) => 
const increment = (amount) => ({ type: INCREMENT, payload: amount });
const add = (amount) => ({ type: ADD, payload: amount });


const reducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return { value: state.value + 1 };
  }

  if (action.type === ADD) {
    return { value: state.value + action.payload };
  }

  return state;
}

const store = createStore(reducer);

store.dispatch(increment());

console.log(store.getState());

