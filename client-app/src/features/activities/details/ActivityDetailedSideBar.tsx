import {
	Flex,
	Heading,
	List,
	Text,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Activity } from "~/types";
import { useColorModeValue } from "../../../components/ui/color-mode";
import { AttendeeListItem } from "./Sidebar.helper";

type Props = {
	activity: Activity;
};

const ActivityDetailedSideBar = ({ activity }: Props) => {
	const { attendees, hostUsername } = activity;
	const bg = useColorModeValue("white", "gray.700");
	return (
		<Flex flexDir="column" p={4} bg={bg} boxShadow={"sm"}>
			<Flex mb={8} alignItems="center">
				<Heading
					as="h4"
					fontSize="2xl"
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
					Attendees
				</Heading>
				<Text pl={3} fontSize="sm" fontWeight="600">
					({attendees?.length || 0}) {attendees?.length === 1 ? "Person" : "People"} going
				</Text>
			</Flex>
			<List.Root listStyleType="none">
				{attendees?.map((attendee) => (
					<AttendeeListItem
						key={attendee.username}
						attendee={attendee}
						hostUsername={hostUsername}
					/>
				))}
			</List.Root>
		</Flex>
	);
};

export default observer(ActivityDetailedSideBar);
