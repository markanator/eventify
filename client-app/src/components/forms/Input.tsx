import { Input, type InputProps, VisuallyHidden } from "@chakra-ui/react";
import { useField } from "formik";
import { Field } from "../ui/field";
import { useColorModeValue } from "../ui/color-mode";

type Props = InputProps & {
	name: string;
	[k: string]: unknown;
};

const InputField = (props: Props) => {
	const [field, meta] = useField(props.name as string);
	const isInvalid = Boolean(meta.touched && meta.error);
	const bg = useColorModeValue("gray.100", "gray.300");
	return (
		<Field
			id={props.name}
			invalid={isInvalid}
			errorText={isInvalid ? meta.error : undefined}
			label={<VisuallyHidden>{props.name}</VisuallyHidden>}
		>
			<Input
				placeholder={props.name}
				bg={bg}
				border={0}
				color={"gray.700"}
				_placeholder={{
					color: "gray.600",
					textTransform: "capitalize",
				}}
				{...field}
				{...props}
			/>
		</Field>
	);
};

export default InputField;
