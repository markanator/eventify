/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Stack } from "@chakra-ui/react";

type Props = {
	errors?: any;
};

const ValidationErrors = ({ errors }: Props) => {
	return (
		<Stack mt={4}>
			{errors &&
				errors?.map((er: any, idx: any) => (
					<Alert.Root key={idx} status="error" variant="subtle">
						<Alert.Indicator />
						<Alert.Content>{er}</Alert.Content>
					</Alert.Root>
				))}
		</Stack>
	);
};

export default ValidationErrors;
