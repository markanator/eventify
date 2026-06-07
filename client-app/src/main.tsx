import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/Router";
import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster";
import { StoreContextProvider } from "./stores/store";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<>
		<StoreContextProvider>
			<Provider>
				<RouterProvider router={router} />
				<Toaster />
			</Provider>
		</StoreContextProvider>
	</>,
);
