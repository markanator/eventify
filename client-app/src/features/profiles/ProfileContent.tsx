import { GridItem, Tabs } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "~/stores/store";
import type { Profile } from "~/types";
import { useColorModeValue } from "../../components/ui/color-mode";
import ProfileAbout from "./ProfileAbout";
import ProfileActivities from "./ProfileActivities";
import ProfileFollowings from "./ProfileFollowings";
import ProfilePhotos from "./ProfilePhotos";

type Props = {
	profile: Profile;
};

const ProfileContent = ({ profile }: Props) => {
	const { profileStore } = useStoreContext();
	const panelBg = useColorModeValue("gray.100", "gray.700");
	return (
		<GridItem colSpan={2}>
			<Tabs.Root
				lazyMount
				unmountOnExit
				mt={6}
				value={String(profileStore.activeTab)}
				onValueChange={(e) => profileStore.setActiveTab(Number(e.value))}
				orientation="vertical"
				variant="enclosed"
				colorPalette="twitter"
			>
				<Tabs.List>
					<Tabs.Trigger value="0">About</Tabs.Trigger>
					<Tabs.Trigger value="1">Photos</Tabs.Trigger>
					<Tabs.Trigger value="2">Events</Tabs.Trigger>
					<Tabs.Trigger value="3">Followers</Tabs.Trigger>
					<Tabs.Trigger value="4">Following</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content
					value="0"
					mr={6}
					bgColor={panelBg}
					borderRadius="lg"
					boxShadow="md"
					w="full"
				>
					<ProfileAbout />
				</Tabs.Content>
				<Tabs.Content
					value="1"
					mr={6}
					bgColor={panelBg}
					borderRadius="lg"
					boxShadow="md"
					w="full"
				>
					<ProfilePhotos profile={profile} />
				</Tabs.Content>
				<Tabs.Content
					value="2"
					mr={6}
					bgColor={panelBg}
					borderRadius="lg"
					boxShadow="md"
					w="full"
				>
					<ProfileActivities />
				</Tabs.Content>
				<Tabs.Content
					value="3"
					mr={6}
					bgColor={panelBg}
					borderRadius="lg"
					boxShadow="md"
					w="full"
				>
					<ProfileFollowings />
				</Tabs.Content>
				<Tabs.Content
					value="4"
					mr={6}
					bgColor={panelBg}
					borderRadius="lg"
					boxShadow="md"
					w="full"
				>
					<ProfileFollowings />
				</Tabs.Content>
			</Tabs.Root>
		</GridItem>
	);
};

export default observer(ProfileContent);
