import {
	Box,
	Flex,
	Heading,
	Image,
	List,
	Tabs,
	VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "~/stores/store";
import type { UserActivity } from "~/types";
import { useColorModeValue } from "../../components/ui/color-mode";

const panes = ["future", "past", "hosting"];

const ProfileActivities = () => {
	const { profileStore } = useStoreContext();
	const { loadUserActivities, profile, isLoadingActivities, userActivities } = profileStore;
	const [tabIndex, setTabIndex] = useState(0);

	const handleTabsChange = (index: number) => {
		setTabIndex(index);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		loadUserActivities(profile!.username, panes[index]);
	};

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		loadUserActivities(profile!.username);
	}, [loadUserActivities, profile]);

	return (
		<Tabs.Root
			value={String(tabIndex)}
			onValueChange={(e) => handleTabsChange(Number(e.value))}
			lazyMount
		>
			<Tabs.List>
				<Tabs.Trigger value="0" disabled={isLoadingActivities}>
					Future Events
				</Tabs.Trigger>
				<Tabs.Trigger value="1" disabled={isLoadingActivities}>
					Past Events
				</Tabs.Trigger>
				<Tabs.Trigger value="2" disabled={isLoadingActivities}>
					Hosting
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="0">
				<Panel userActivities={userActivities} />
			</Tabs.Content>
			<Tabs.Content value="1">
				<Panel userActivities={userActivities} />
			</Tabs.Content>
			<Tabs.Content value="2">
				<Panel userActivities={userActivities} />
			</Tabs.Content>
		</Tabs.Root>
	);
};

const Panel = ({ userActivities }: { userActivities: UserActivity[] }) => {
	const cardBgColor = useColorModeValue("gray.200", "gray.600");

	return (
		<Box>
			<List.Root display="flex" flexWrap="wrap" gap={4} listStyle="none">
				{userActivities.map((activity) => {
					return (
						<List.Item
							shadow="lg"
							key={activity.id}
							bgColor={cardBgColor}
							flex="0 0 22%"
							borderRadius="md"
							overflow="hidden"
						>
							<Flex
								asChild
								flexDir="column"
								alignItems="center"
								justifyContent="center"
							>
								<Link to={`/activities/${activity.id}`}>
								<Image
									src={`/assets/categoryImages/${activity.category}.jpg`}
									style={{ minHeight: 100, objectFit: "cover" }}
									w="auto"
									h={150}
									mb={2}
									alt={activity.title}
								/>
								<VStack mb={3}>
									<Heading fontSize="xl">{activity.title}</Heading>
									<VStack>
										<div>{dayjs(activity.date).format("MMMM D, YYYY")}</div>
										<div>{dayjs(activity.date).format("h:mm A")}</div>
									</VStack>
								</VStack>
								</Link>
							</Flex>
						</List.Item>
					);
				})}
			</List.Root>
		</Box>
	);
};

export default observer(ProfileActivities);
