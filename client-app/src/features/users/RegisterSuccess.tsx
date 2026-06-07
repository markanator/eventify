import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import agent from "~/async/fetcher/agent";
import useQuery from "~/hooks/useQuery";
import { toaster } from "../../components/ui/toaster";

const RegisterSuccess = () => {
	const email = useQuery().get("email") as string;
	const handleConfirmEmailResend = async () => {
		try {
			await agent.Account.resendEmailConfirm(email);
			toaster.create({
				type: "success",
				title: "Email sent.",
				description: "Verification email resent - please check your email.",
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Box>
			<Container mx="auto" my={20} maxW="5xl">
				<Flex flexDir="column" gap={4}>
					<Heading>Successfully Registered!</Heading>
					<Text>Please Check your email (including junk folders) for the verification email.</Text>
					{email && (
						<>
							<Text>Didn&apos;t receive the email? Click below to resend</Text>
							<Button size="lg" type="button" onClick={handleConfirmEmailResend}>
								Resend Confirmation Email
							</Button>
						</>
					)}
				</Flex>
			</Container>
		</Box>
	);
};

export default RegisterSuccess;
