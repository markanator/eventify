import { Button, Group, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

type Props = {
	isUploading: boolean;
	handlePhotoUpload: (file: Blob) => void;
};

const PhotoUploadWidget = ({ handlePhotoUpload, isUploading }: Props) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [files, setFiles] = useState<any[]>([]);
	const [getCroppedBlob, setGetCroppedBlob] = useState<(() => Promise<Blob | null>) | null>(null);

	const handleCropperReady = useCallback((getBlob: () => Promise<Blob | null>) => {
		setGetCroppedBlob(() => getBlob);
	}, []);

	async function onCrop() {
		if (!getCroppedBlob) return;
		const blob = await getCroppedBlob();
		if (blob) handlePhotoUpload(blob);
	}

	useEffect(() => {
		return () => {
			// remove preview from memory
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			files?.forEach((file: any) => URL.revokeObjectURL(file?.preview));
		};
	}, [files]);

	return (
		<VStack gap={6} w="full">
			<Flex justifyContent="space-between" w="full" px={6}>
				<Text fontSize="xl">Step 1: Add Photo</Text>
				<Text fontSize="xl">Step 2: Resize Image</Text>
				<Text fontSize="xl">Step 3: Preview & Upload</Text>
			</Flex>
			<HStack w="full" justifyContent="flex-start" alignItems="flex-start">
				<Flex flex="0 0 33.33%">
					<PhotoWidgetDropzone setFiles={setFiles} />
				</Flex>
				<Flex flex="0 0 33.33%" alignItems="center">
					{files && files.length > 0 && (
						<PhotoWidgetCropper onReady={handleCropperReady} imagePreview={files?.[0]?.preview} />
					)}
				</Flex>
				<Flex flex="0 0 33.33%">
					{files && files.length > 0 && (
						<Flex flexDir="column" alignItems="center" w="full">
							<cropper-viewer
								selection="#photo-crop-selection"
								style={{ display: "block", minHeight: "200px", width: "100%", overflow: "hidden" }}
							/>
							<Group attached mt={6}>
								<Button size="lg" variant="solid" colorPalette="blue" loading={isUploading} onClick={onCrop}>
									Save
								</Button>
								<Button size="lg" variant="solid" colorPalette="red" disabled={isUploading} onClick={() => setFiles([])}>
									Close
								</Button>
							</Group>
						</Flex>
					)}
				</Flex>
			</HStack>
		</VStack>
	);
};

export default observer(PhotoUploadWidget);
