import { Input, VisuallyHidden } from "@chakra-ui/react";
import { useField } from "formik";
import DatePicker from "react-datepicker";
import { Field } from "../ui/field";
import { useColorModeValue } from "../ui/color-mode";

type Props = {
	name: string;
	[k: string]: unknown;
};

const InputDate = ({ name, ...rest }: Props) => {
	const [field, meta, helpers] = useField(name);
	const isInvalid = Boolean(meta.touched && meta.error);
	const bg = useColorModeValue("gray.100", "gray.300");

	return (
		<Field
			id={name}
			invalid={isInvalid}
			errorText={isInvalid ? meta.error : undefined}
			label={<VisuallyHidden>{name}</VisuallyHidden>}
		>
			<DatePicker
				{...rest}
				customInput={
					<Input
						bgColor={bg}
						border={0}
						color={"gray.700"}
						_placeholder={{
							color: "gray.600",
							textTransform: "capitalize",
						}}
					/>
				}
				placeholderText={name}
				name={field.name}
				selected={field.value ? new Date(field.value) : null}
				onChange={(v: Date | null) => {
					helpers.setValue(v);
				}}
			/>
		</Field>
	);
};

export default InputDate;
