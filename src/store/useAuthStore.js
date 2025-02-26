import { create } from 'zustand';

const useAuthStore = create((set) => ({
  roleId: 0,
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token') || null,
  roles: [],

  setRoleId: (roleId) => {
    set({ roleId });
  },

  handleAuthenticate: (data) => {
    if (data?.token) {
      set({ token: data.token });
      localStorage.setItem('token', data.token);
    }
  },

  handleGetLoggedInUserAndTenantInfo: (data) => {
    const selectedRoleId = data?.roles?.find((role) => role.id === data.currentRoleId)?.id || data.roles[0]?.id || 0;
    set({
      user: data,
      isAuthenticated: true,
      roleId: selectedRoleId,
      roles: data.roles || [],
    });
  },

  logout: () => {
    sessionStorage.clear();
    localStorage.clear();
    set({ isAuthenticated: false, user: null, token: null, roles: [], roleId: 0 });
  },
}));

export default useAuthStore;
