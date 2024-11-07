// store/index.js
export const state = () => ({
  token: null,
  user: null,
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  },

  setToken(state, token) {
    state.token = token;
    localStorage.setItem("token", token);
  },

  clearUser(state) {
    state.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
  
  clearToken(state) {
    state.token = null;
    localStorage.removeItem('token');
  },
};

export const actions = {
  loadUserFromStorage({ commit }) {
    if (process.client) { 
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      
      if (user && token) {
        commit('setUser', user);
        commit('setToken', token);
      }
    }
  },
  nuxtClientInit({ dispatch }) {
    dispatch('loadUserFromStorage');
  },
};

export const getters = {
  isAuthenticated(state) {
    return !!state.user && !!state.token; 
  },
  getRole(state) {
    return state.user ? state.user.role.name : null;
  },
  getUser(state) {
    return state.user ? state.user: null;
  },
  getToken(state) {
    return state.token;
  },
};
