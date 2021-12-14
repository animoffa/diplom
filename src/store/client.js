import AuthAPI from "@/services/APIServiceAuth.js";
import ResourceAPI, { APIServiceResource } from "@/services/APIServiceResource.js";

export const state = () => ({
  user: {},
  allUsers: []
});

export const mutations = {

  setUser(state, payload) {
    state.user = payload;
  },
  setUsers(state, payload) {
    state.allUsers = payload;
  },
};

export const actions = {
  async getUser({ commit }) {
    const responseAuth = await AuthAPI.getAuth();
    commit('setUser', await responseAuth.json());

  },
  async getAllUsers({ commit }) {
    const response = await ResourceAPI.getResources(APIServiceResource.ResourceType.users);
    commit('setUsers', await response.json());
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
}