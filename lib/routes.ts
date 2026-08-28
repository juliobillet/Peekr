export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  agenda: "/dashboard/agenda",
  bookings: "/bookings",
  messages: "/messages",
  notifications: "/notifications",
  settings: "/settings",
  profile: (username: string) => `/${username}`,
};
