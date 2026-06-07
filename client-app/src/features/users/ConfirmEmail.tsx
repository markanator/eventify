import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import agent from "~/async/fetcher/agent";
import useQuery from "~/hooks/useQuery";
import { toaster } from "../../components/ui/toaster";
import LoginModal from "./LoginModal";

const Status = {
	Verifying: "Verifying",
	Failed: "Failed",
	Success: "Success",
};

const ConfirmEmail = () => {
	const email = useQuery().get("email") as string;
	const token = useQuery().get("token") as string;
	const [status, setStatus] = useState(Status.Verifying);

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

	useEffect(() => {
		// poll endpoint
		agent.Account.verifyEmail(token, email)
			.then(() => {
				setStatus(Status.Success);
			})
			.catch((err) => {
				console.log(err);
				setStatus(Status.Failed);
			});
	}, [email, token]);

	const getBodyContent = () => {
		switch (status) {
			case Status.Verifying:
				return <p>Verifying...</p>;
			case Status.Failed:
				return (
					<VStack gap={12}>
						<Text>Verification failed. You can try resending the verify link to your email</Text>
						<Button onClick={handleConfirmEmailResend}>Resend Email</Button>
					</VStack>
				);
			case Status.Success:
				return (
					<VStack gap={12}>
						<Text>Email has been verified - you can now login</Text>
						<LoginModal />
					</VStack>
				);
		}
	};

	return (
		<Container mx="auto" maxW="5xl" mt={100}>
			<VStack gap={4}>
				<EnvelopeIcon width={100} height={100} />
				<Heading>Email verification</Heading>
			</VStack>
			<Flex flexDir="column" mt={12}>
				{getBodyContent()}
			</Flex>
		</Container>
	);
};

export default ConfirmEmail;
