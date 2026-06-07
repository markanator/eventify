import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
	Collapsible,
	Flex,
	Icon,
	Link,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

export const MobileNav = () => {
	const bg = useColorModeValue("white", "gray.800");
	return (
		<Stack bg={bg} p={4} display={{ md: "none" }}>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
	const { open, onToggle } = useDisclosure();
	const textColor = useColorModeValue("gray.600", "gray.200");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	return (
		<Stack gap={4} onClick={children && onToggle}>
			<Flex
				asChild
				py={2}
				justify={"space-between"}
				align={"center"}
				_hover={{
					textDecoration: "none",
				}}
			>
				<a href={href ?? "#"}>
					<Text fontWeight={600} color={textColor}>
						{label}
					</Text>
					{children && (
						<Icon
							transition={"all .25s ease-in-out"}
							transform={open ? "rotate(180deg)" : ""}
							w={6}
							h={6}
						>
							<ChevronDownIcon />
						</Icon>
					)}
				</a>
			</Flex>

			<Collapsible.Root open={open} style={{ marginTop: "0!important" }}>
				<Collapsible.Content>
					<Stack
						mt={2}
						pl={4}
						borderLeft={1}
						borderStyle={"solid"}
						borderColor={borderColor}
						align={"start"}
					>
						{children &&
							children.map((child) => (
								<Link key={child.label} py={2} href={child.href}>
									{child.label}
								</Link>
							))}
					</Stack>
				</Collapsible.Content>
			</Collapsible.Root>
		</Stack>
	);
};

export interface NavItem {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
}

export const NAV_ITEMS: Array<NavItem> = [
	{
		label: "Activities",
		href: "/activities",
	},
];
