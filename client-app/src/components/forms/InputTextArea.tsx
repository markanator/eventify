import { Textarea, type TextareaProps, VisuallyHidden } from "@chakra-ui/react";
import { useField } from "formik";
import { Field } from "../ui/field";
import { useColorModeValue } from "../ui/color-mode";

type Props = TextareaProps & {
	name: string;
};

const InputTextArea = ({ name, ...rest }: Props) => {
	const [field, meta] = useField(name);
	const isInvalid = Boolean(meta.touched && meta.error);
	const bg = useColorModeValue("gray.100", "gray.300");

	return (
		<Field
			id={name}
			invalid={isInvalid}
			errorText={isInvalid ? meta.error : undefined}
			label={<VisuallyHidden>{name}</VisuallyHidden>}
		>
			<Textarea
				placeholder={name}
				bgColor={bg}
				border={0}
				color={"gray.700"}
				resize="vertical"
				_placeholder={{
					color: "gray.600",
					textTransform: "capitalize",
				}}
				{...field}
				{...rest}
			/>
		</Field>
	);
};

export default InputTextArea;
