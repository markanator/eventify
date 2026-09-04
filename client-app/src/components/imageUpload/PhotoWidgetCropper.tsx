// Registers the <cropper-*> custom elements globally. Cropper.js v2 is a set
// of web components and no longer ships a `dist/cropper.css` (styling is
// built into the elements themselves), so no CSS import is required here.
import "cropperjs";
import { useEffect, useRef } from "react";

export type CropperSelectionElement = HTMLElement & {
	initialCoverage: number;
	initialAspectRatio: number;
	$toCanvas: (options?: { width?: number; height?: number }) => Promise<HTMLCanvasElement>;
};

type Props = {
	imagePreview: string;
	/** Called once the cropper selection is mounted, with a helper to pull the current crop as a Blob. */
	onReady: (getCroppedBlob: () => Promise<Blob | null>) => void;
};

const PhotoWidgetCropper = ({ imagePreview, onReady }: Props) => {
	const selectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const selection = selectionRef.current as CropperSelectionElement | null;
		if (!selection) return;

		const getCroppedBlob = () =>
			selection.$toCanvas().then(
				(canvas) =>
					new Promise<Blob | null>((resolve) => {
						canvas.toBlob((blob) => resolve(blob));
					}),
			);

		onReady(getCroppedBlob);
		// only re-wire when a new image is loaded into the cropper
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imagePreview]);

	return (
		<cropper-canvas id="photo-cropper-canvas" style={{ height: "300px", width: "100%" }}>
			<cropper-image
				src={imagePreview}
				alt="crop preview"
				translatable
				scalable
				rotatable
				skewable
			/>
			<cropper-shade hidden />
			<cropper-handle action="select" plain />
			<cropper-selection
				ref={selectionRef}
				id="photo-crop-selection"
				initial-coverage="1"
				initial-aspect-ratio="1"
				movable
				resizable
				outlined
			>
				<cropper-crosshair centered />
				<cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)" />
				<cropper-handle action="n-resize" />
				<cropper-handle action="e-resize" />
				<cropper-handle action="s-resize" />
				<cropper-handle action="w-resize" />
				<cropper-handle action="ne-resize" />
				<cropper-handle action="nw-resize" />
				<cropper-handle action="se-resize" />
				<cropper-handle action="sw-resize" />
			</cropper-selection>
		</cropper-canvas>
	);
};

export default PhotoWidgetCropper;
