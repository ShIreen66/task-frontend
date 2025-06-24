export const isLoggedIn = () => !!localStorage.getItem('token')
export const setToken = (token) => localStorage.setItem('token', token)
export const logout = () => localStorage.removeItem('token')
