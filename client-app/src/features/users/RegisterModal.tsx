import {
	Button,
	CloseButton,
	Dialog,
	Portal,
	useDisclosure,
} from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";

const RegisterModal = () => {
	const { open, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button onClick={onOpen} variant="plain">
				Register
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
								<RegisterForm />
							</Dialog.Body>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</>
	);
};

export default RegisterModal;
