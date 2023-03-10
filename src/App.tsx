import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "./routes";
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				closeOnClick
				draggable
				pauseOnHover
			/>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
