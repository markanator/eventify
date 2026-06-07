import {
	Button,
	CloseButton,
	Dialog,
	Portal,
	useDisclosure,
} from "@chakra-ui/react";
import LoginForm from "./LoginForm";

const LoginModal = () => {
	const { open, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button onClick={onOpen} variant="plain">
				Login
			</Button>
			<Dialog.Root
				open={open}
				onOpenChange={(e) => (e.open ? onOpen() : onClose())}
			>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.CloseTrigger asChild>
								<CloseButton size="sm" />
							</Dialog.CloseTrigger>
							<Dialog.Body>
								<LoginForm />
							</Dialog.Body>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</>
	);
};

export default LoginModal;
