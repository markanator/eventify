import { Flex, Heading, List } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import Calendar from "react-calendar";
import { useStoreContext } from "~/stores/store";
import { useColorModeValue } from "../../../components/ui/color-mode";

const ActivityFilters = () => {
	const {
		activityStore: { predicate, setPredicate },
	} = useStoreContext();
	const bg = useColorModeValue("white", "gray.700");
	return (
		<>
			<Flex
				flexDir="column"
				py={4}
				bg={bg}
				boxShadow={"sm"}
				mb={8}
				mt={[0, 0, 16]}
			>
				<Heading
					mx={4}
					as="h4"
					fontSize="2xl"
					mb={8}
					display="block"
					pos="relative"
					_after={{
						position: "absolute",
						bottom: "-15px",
						left: "0px",
						content: '""',
						width: "30px",
						height: "1px",
						backgroundColor: "#e86c60",
					}}
				>
					Filters
				</Heading>
				<List.Root listStyleType="none" m={0}>
					<ListItemWrapper
						onClick={() => setPredicate("all", "true")}
						active={predicate.has("all")}
					>
						All Activities
					</ListItemWrapper>
					<ListItemWrapper
						onClick={() => setPredicate("isGoing", "true")}
						active={predicate.has("isGoing")}
					>
						I&apos;m going
					</ListItemWrapper>
					<ListItemWrapper
						onClick={() => setPredicate("isHost", "true")}
						active={predicate.has("isHost")}
					>
						I&apos;m hosting
					</ListItemWrapper>
				</List.Root>
			</Flex>
			<Calendar
				onChange={(value) => setPredicate("startDate", value as Date)}
				value={predicate.get("startDate") || new Date()}
			/>
		</>
	);
};

const ListItemWrapper = ({
	children,
	active = false,
	onClick,
}: {
	children?: React.ReactNode;
	active?: boolean;
	onClick: () => void;
}) => {
	const bgc = useColorModeValue("gray.200", "gray.600");
	return (
		<List.Item
			display="flex"
			borderBottom="1px solid"
			borderColor="gray.300"
			fontWeight={500}
			onClick={onClick}
			px={4}
			py={3}
			_last={{
				border: "none",
			}}
			_hover={{ backgroundColor: "gray.500" }}
			backgroundColor={active ? bgc : ""}
		>
			{children}
		</List.Item>
	);
};

export default observer(ActivityFilters);
