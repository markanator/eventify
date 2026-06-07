import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";

export const useAttachScripts = () => {
	const nav = useNavigate();
	if (!window.navigate) {
		window.navigate = nav;
	}

	if (!window.toast) {
		window.toast = toaster.create;
	}
};
