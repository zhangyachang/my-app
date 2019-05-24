import {createStore} from 'redux'

let state1= {
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ],
  num: 0
};


function counter(state = state1, action) {
  if (action.type === 'add') {
    state.num += 1
  }else if(action.type === 'reduce'){
    state.num -= 1;
  }
  return state;
}

let store = createStore(counter);

store.subscribe(() => {

  console.log('订阅函数');
  console.log(store.getState());
});


store.dispatch({
  type: 'add',
  index: 1
});

store.dispatch({
  type: 'reduce',
  fileter: 'Show_AA'
});
