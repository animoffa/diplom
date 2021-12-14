export const state = () => ({
  openedModalName: '',
  isModalOpened: false,
  showLoader: false,
});

export const mutations = {
  setOpenModalName(state, payload) {
    state.openedModalName = payload;
  },
  setModalState(state, payload) {
    state.isModalOpened = payload;
  },

  setLoaderState(state, payload) {
    state.showLoader = payload;
  },

  hideAllOverlayElements(state) {
    state.openedModalName = '';
    state.isModalOpened = false;
    state.showLoader = false;
  },
};
export const actions = {};
