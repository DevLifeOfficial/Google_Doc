import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../layouts/AppLayout";

import { DashboardPage } from "../pages/DashboardPage";
import { EditorPage } from "../pages/EditorPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "documents/:id",
        element: <EditorPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);