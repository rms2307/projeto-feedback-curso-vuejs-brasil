import { reactive } from "vue";

export default state;

const state = reactive({
  currentUser: {},
});

export function cleanCurrentUser() {
  state.currentUser = {};
}

export function setCurrentUser(user) {
  state.currentUser = user;
}

export function setApiKey(apiKey) {
  const currentUser = { ...state.currentUser, apiKey };
  state.currentUser = currentUser;
}
