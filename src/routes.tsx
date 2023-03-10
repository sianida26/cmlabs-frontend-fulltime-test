import { createBrowserRouter, Navigate } from "react-router-dom";
import { Ingredients, IngredientDetail, Meal } from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Ingredients />
    },
    {
        path: "/ingredient",
        children: [
            {
                index: true,
                element: <Navigate to="/" />
            },
            {
                path: ":ingredient",
                element: <IngredientDetail />
            },
        ],
    },
    {
        path: "/meal",
        children: [
            {
                index: true,
                element: <Navigate to="/" />
            },
            {
                path: ":meal",
                element: <Meal />
            },
        ],
    },
])

export default router;
