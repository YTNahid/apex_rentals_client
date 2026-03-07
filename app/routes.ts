import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
  route("add-car", "routes/addCar.tsx"),
  route("available-cars", "routes/availableCars.tsx"),
  route("car-details/:id", "routes/carDetails.tsx"),
  route("my-cars", "routes/myCars.tsx"),
  route("my-bookings", "routes/myBookings.tsx"),
] satisfies RouteConfig;
