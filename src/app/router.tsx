import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import {
  DashboardPage,
  NotFoundPage,
  EditorPage,
  RecentDocumentsPage,
} from "../pages/index";
import { DashBoardLayout } from "../layouts/DashBoardLayout";
import { EditorLayout } from "../layouts/EditorLayout";
import { Trash } from "../components/trash/trash";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        element: <DashBoardLayout />,
        children: [
          {
            path: "/",
            element: <DashboardPage />,
          },
          {
            path: "/recent",
            element: <RecentDocumentsPage />,
          },
          {
            path:"/trash",
            element: <Trash/>
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
      {
        element: <EditorLayout />,
        children: [
          {
            path: "documents/:id",
            element: <EditorPage />,
          },
        ],
      },
    ],
  },
]);
