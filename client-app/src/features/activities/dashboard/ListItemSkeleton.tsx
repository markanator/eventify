import {
	Box,
	HStack,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../../components/ui/color-mode";
import React from "react";

const ListItemSkeleton = () => {
	const itemBgColor = useColorModeValue("white", "gray.700");

	return (
		<Box padding="6" mb={6} boxShadow="lg" bg={itemBgColor}>
			<HStack>
				<SkeletonCircle size="10" />
				<SkeletonText noOfLines={1} />
			</HStack>
			<Skeleton height="320px" />
			<SkeletonText mt="4" noOfLines={4} gap={6} />
		</Box>
	);
};

export default ListItemSkeleton;
