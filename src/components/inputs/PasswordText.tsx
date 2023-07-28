/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { Box, Popover, PasswordInput, Progress } from "@mantine/core";
import type { PasswordInputProps } from "@mantine/core";

import PasswordRequirement from "../helpers/PasswordRequirement";

import {
  requirements,
  getStrength,
  getColorByStrength,
} from "../../utils/passwordStrength";

interface PasswordTextProps extends PasswordInputProps {
  label: string;
  placeholder: string;
}

const PasswordText: React.FC<PasswordTextProps> = ({
  label,
  placeholder,
  ...parentProps
}) => {
  const inputValue = parentProps.value as string;

  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      label={requirement.label}
      meets={requirement.re.test(inputValue)}
    />
  ));

  const strength = getStrength(inputValue);
  const color = getColorByStrength(strength);

  return (
    <Box>
      <Popover
        opened={popoverOpened}
        position="bottom"
        width="target"
        transitionProps={{ transition: "pop" }}
      >
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <PasswordInput
              withAsterisk
              label={label}
              placeholder={placeholder}
              {...parentProps}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress color={color} value={strength} size={5} mb="xs" />
          <PasswordRequirement
            label="Debe contener al menos 8 caracteres"
            meets={inputValue.length > 7}
          />
          {checks}
        </Popover.Dropdown>
      </Popover>
    </Box>
  );
};

export { type PasswordTextProps };
export default PasswordText;
