import ResourceAPI, { APIServiceResource } from "@/services/APIServiceResource.js";

export const state = () => ({
  articles: []
});
export const mutations = {
 
  setArticles(state, payload) {
    state.articles = payload
  },
};

export const actions = {
  async getArticles({ commit }) {
    const response = await ResourceAPI.getResources(APIServiceResource.ResourceType.articles);
    commit('setArticles', await response.json());
  },
  async editArticle() {
    
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
