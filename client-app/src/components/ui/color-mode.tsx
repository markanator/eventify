"use client";

import { IconButton, type IconButtonProps, Span } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import * as React from "react";

export type ColorMode = "light" | "dark";

interface ColorModeContextValue {
	colorMode: ColorMode;
	setColorMode: (mode: ColorMode) => void;
	toggleColorMode: () => void;
}

const ColorModeContext = React.createContext<ColorModeContextValue>({
	colorMode: "light",
	setColorMode: () => {},
	toggleColorMode: () => {},
});

const STORAGE_KEY = "chakra-ui-color-mode";

function applyColorMode(mode: ColorMode) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	root.classList.remove("light", "dark");
	root.classList.add(mode);
	root.style.colorScheme = mode;
}

export interface ColorModeProviderProps {
	children: React.ReactNode;
	defaultValue?: ColorMode;
}

export function ColorModeProvider(props: ColorModeProviderProps) {
	const { children, defaultValue = "light" } = props;
	const [colorMode, setColorModeState] = React.useState<ColorMode>(() => {
		if (typeof window === "undefined") return defaultValue;
		const stored = window.localStorage.getItem(STORAGE_KEY);
		return stored === "dark" || stored === "light" ? stored : defaultValue;
	});

	const setColorMode = React.useCallback((mode: ColorMode) => {
		setColorModeState(mode);
		if (typeof window !== "undefined") {
			window.localStorage.setItem(STORAGE_KEY, mode);
		}
		applyColorMode(mode);
	}, []);

	const toggleColorMode = React.useCallback(() => {
		setColorMode(colorMode === "dark" ? "light" : "dark");
	}, [colorMode, setColorMode]);

	React.useEffect(() => {
		applyColorMode(colorMode);
	}, [colorMode]);

	const value = React.useMemo(
		() => ({ colorMode, setColorMode, toggleColorMode }),
		[colorMode, setColorMode, toggleColorMode],
	);

	return (
		<ColorModeContext.Provider value={value}>
			{children}
		</ColorModeContext.Provider>
	);
}

export function useColorMode() {
	const context = React.useContext(ColorModeContext);
	if (context === undefined) {
		throw new Error("useColorMode must be used within a ColorModeProvider");
	}
	return context;
}

export function useColorModeValue<T>(light: T, dark: T) {
	const { colorMode } = useColorMode();
	return colorMode === "dark" ? dark : light;
}

export function ColorModeIcon() {
	const { colorMode } = useColorMode();
	return colorMode === "dark" ? (
		<MoonIcon width={20} height={20} />
	) : (
		<SunIcon width={20} height={20} />
	);
}

interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}

export const ColorModeButton = React.forwardRef<
	HTMLButtonElement,
	ColorModeButtonProps
>(function ColorModeButton(props, ref) {
	const { toggleColorMode } = useColorMode();
	return (
		<IconButton
			onClick={toggleColorMode}
			variant="ghost"
			aria-label="Toggle color mode"
			size="sm"
			ref={ref}
			{...props}
			css={{
				_icon: {
					width: "5",
					height: "5",
				},
			}}
		>
			<ColorModeIcon />
		</IconButton>
	);
});

export function LightMode(props: React.ComponentProps<typeof Span>) {
	return (
		<Span
			color="fg"
			display="contents"
			className="chakra-theme light"
			colorPalette="gray"
			colorScheme="light"
			{...props}
		/>
	);
}

export function DarkMode(props: React.ComponentProps<typeof Span>) {
	return (
		<Span
			color="fg"
			display="contents"
			className="chakra-theme dark"
			colorPalette="gray"
			colorScheme="dark"
			{...props}
		/>
	);
}
