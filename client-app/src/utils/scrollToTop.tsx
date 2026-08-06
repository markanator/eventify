import React, { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop() {
	const { pathname } = useLocation();
	useEffect(() => {
		window?.scrollTo({
			top: 0,
			left: 0,
		});
	}, [pathname]);

	return null;
}

export default ScrollToTop;
