import type { CreateToasterReturn } from "@chakra-ui/react";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

// Cropper.js v2 ships as native custom elements (<cropper-canvas>, <cropper-image>, ...).
// These aren't part of React's built-in JSX.IntrinsicElements, so declare them
// permissively (arbitrary kebab-case attributes/props are valid on custom elements).
type CropperElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
};

// React 19 resolves the JSX namespace from `React.JSX` (re-exported via
// react/jsx-runtime), not the ambient global `JSX` namespace, so augment it there.
declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			"cropper-canvas": CropperElementProps;
			"cropper-image": CropperElementProps;
			"cropper-shade": CropperElementProps;
			"cropper-handle": CropperElementProps;
			"cropper-selection": CropperElementProps;
			"cropper-crosshair": CropperElementProps;
			"cropper-grid": CropperElementProps;
			"cropper-viewer": CropperElementProps;
		}
	}
}

export interface PaginationHeader {
	currentPage: number;
	itemsPerPage: number;
	totalItems: number;
	totalPages: number;
}

declare global {
	interface Window {
		toast: CreateToasterReturn["create"];
		navigate: (url: string) => void;
		FB: any;
	}
}
export interface Activity {
	id: string;
	title: string;
	date: Date | null;
	description: string;
	category: string;
	city: string;
	venue: string;
	hostUsername: string;
	isCancelled: boolean;
	attendees: Profile[];
	// client side additions
	isGoing: boolean;
	isHost: boolean;
	host?: Profile;
}

export interface ServerError {
	statusCode: number;
	message: string;
	details: string;
}

export interface Profile {
	username: string;
	displayName: string;
	image?: string;
	bio?: string;
	photos?: Photo[];
	followersCount: number;
	followingCount: number;
	following: boolean;
}

export interface Photo {
	id: string;
	url: string;
	isMain: boolean;
}

export interface User {
	username: string;
	displayName: string;
	token: string;
	image?: string;
}

export interface Comment {
	id: number;
	createdAt: Date;
	body: string;
	username: string;
	displayName: string;
	image?: string;
}

export interface UserActivity {
	id: string;
	title: string;
	category: string;
	date: Date;
}
