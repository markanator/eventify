import {
	NativeSelect,
	type NativeSelectFieldProps,
	VisuallyHidden,
} from "@chakra-ui/react";
import { useField } from "formik";
import { Field } from "../ui/field";
import { useColorModeValue } from "../ui/color-mode";

type Props = NativeSelectFieldProps & {
	name: string;
	options: { label: string; value: string | number }[];
	[k: string]: unknown;
};

const InputSelect = ({ name, options, ...rest }: Props) => {
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
			<NativeSelect.Root>
				<NativeSelect.Field
					bgColor={bg}
					color={"black"}
					placeholder={`Select a ${name}`}
					{...rest}
					{...field}
				>
					{options?.map(({ label, value }) => (
						<option key={label} value={value}>
							{label}
						</option>
					))}
				</NativeSelect.Field>
				<NativeSelect.Indicator />
			</NativeSelect.Root>
		</Field>
	);
};

export default InputSelect;
