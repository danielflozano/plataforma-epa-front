import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";

export const HorasExtraApp = () => {
  return (
    <RouterProvider router={ AppRouter } />
  );
};