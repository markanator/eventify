import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
	Box,
	Button,
	Collapsible,
	Flex,
	IconButton,
	Menu,
	Portal,
	Stack,
	Text,
	useBreakpointValue,
	useDisclosure,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "~/stores/store";
import { Avatar } from "./ui/avatar";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import DesktopNav from "./DesktopNav";
import { MobileNav } from "./MobileNav";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { open, onToggle } = useDisclosure();
	const {
		userStore: { user, logout },
	} = useStoreContext();

	const bg = useColorModeValue("white", "gray.800");
	const color = useColorModeValue("gray.600", "white");
	const borderColor = useColorModeValue("gray.200", "gray.900");
	const headingColor = useColorModeValue("gray.800", "white");
	const textAlign = useBreakpointValue({ base: "center", md: "left" } as const);

	return (
		<Box>
			<Flex
				bg={bg}
				color={color}
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 8 }}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={borderColor}
				align={"center"}
			>
				<Flex
					flex={{ base: 1, md: "auto" }}
					ml={{ base: -2 }}
					display={{ base: "flex", md: "none" }}
				>
					<IconButton
						onClick={onToggle}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					>
						{open ? <XMarkIcon width={12} height={12} /> : <Bars3Icon width={20} height={20} />}
					</IconButton>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }} alignItems="center">
					<Text
						asChild
						textAlign={textAlign}
						fontFamily={"heading"}
						color={headingColor}
					>
						<NavLink to="/">Reactivities</NavLink>
					</Text>

					<Flex display={{ base: "none", md: "flex" }} alignItems="center" ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					alignItems="center"
					direction={"row"}
					gap={6}
				>
					<Button onClick={toggleColorMode} variant="ghost" size="sm">
						{colorMode === "light" ? <MoonIcon width={20} height={20} /> : <SunIcon width={20} height={20} />}
					</Button>
					{!user ? (
						<>
							<Button asChild fontSize={"sm"} fontWeight={400} variant={"plain"}>
								<Link to={"/login"}>Sign In</Link>
							</Button>
							<Button
								display={{ base: "none", md: "inline-flex" }}
								fontSize={"sm"}
								fontWeight={600}
								color={"white"}
								bg={"green.400"}
								_hover={{
									bg: "green.300",
								}}
							>
								Sign Up
							</Button>
						</>
					) : (
						<Menu.Root>
							<Menu.Trigger asChild>
								<Box as="button" cursor="pointer">
									<Avatar size="sm" name={user?.displayName} src={user?.image} />
								</Box>
							</Menu.Trigger>
							<Portal>
								<Menu.Positioner>
									<Menu.Content>
										<Menu.Item value="profile" asChild>
											<Link to={`/profiles/${user?.username}`}>Profile</Link>
										</Menu.Item>
										<Menu.Item value="logout" onClick={logout}>
											Logout
										</Menu.Item>
									</Menu.Content>
								</Menu.Positioner>
							</Portal>
						</Menu.Root>
					)}
				</Stack>
			</Flex>

			<Collapsible.Root open={open}>
				<Collapsible.Content>
					<MobileNav />
				</Collapsible.Content>
			</Collapsible.Root>
		</Box>
	);
};

export default observer(Navbar);
