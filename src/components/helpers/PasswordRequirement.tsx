import { IconX, IconCheck } from "@tabler/icons-react";
import { Text, Box } from "@mantine/core";

interface PasswordRequirementProps {
  meets: boolean;
  label: string;
}

const PasswordRequirement: React.FC<PasswordRequirementProps> = ({
  meets,
  label,
}) => {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
};

export { type PasswordRequirementProps };
export default PasswordRequirement;
