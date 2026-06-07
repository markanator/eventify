import { HStack, Popover, Portal, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProfileCard from "~/features/profiles/ProfileCard";
import { Profile } from "~/types";
import { Avatar } from "../../../components/ui/avatar";

type Props = {
	attendees?: Profile[];
};

const ListItemAttendee = ({ attendees }: Props) => {
	return (
		<HStack>
			{attendees &&
				attendees.map((profile) => <AttendeePopover key={profile.username} profile={profile} />)}
		</HStack>
	);
};

const AttendeePopover = ({ profile }: { profile: Profile }) => {
	const { open, onClose, onOpen } = useDisclosure();
	return (
		<Popover.Root
			key={profile.username}
			lazyMount
			open={open}
			onOpenChange={(e) => (e.open ? onOpen() : onClose())}
			positioning={{ placement: "top-start" }}
			closeOnInteractOutside={false}
		>
			<Popover.Trigger asChild>
				<Link to={`/profiles/${profile.username}`} onMouseEnter={onOpen} onMouseLeave={onClose}>
					<Avatar
						border="2px solid var(--chakra-colors-gray-100)"
						borderColor={
							profile?.following
								? "var(--chakra-colors-orange-500) !important"
								: "var(--chakra-colors-gray-100)"
						}
						size="sm"
						src={profile?.image ?? "/assets/user.png"}
						name={profile.displayName}
					/>
				</Link>
			</Popover.Trigger>
			<Portal>
				<Popover.Positioner>
					<Popover.Content id="content">
						<Popover.Body p={0}>
							<ProfileCard profile={profile} />
						</Popover.Body>
					</Popover.Content>
				</Popover.Positioner>
			</Portal>
		</Popover.Root>
	);
};

export default ListItemAttendee;
