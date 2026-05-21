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
  room: (roomId: string) => `/room/${roomId}`,
  profile: (username: string) => `/${username}`,
};
