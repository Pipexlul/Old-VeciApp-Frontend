import type { EventHandler, SyntheticEvent, ChangeEventHandler } from "react";
import type { GetInputProps } from "@mantine/form/lib/types";

const combineEventHandlers = <E extends SyntheticEvent>(
  ...handlers: EventHandler<E>[]
) => {
  return (event: E) => {
    handlers.forEach((handler) => {
      handler(event);
    });
  };
};

const withMergeFormPropWithChangeHandler = (
  changeHandler: ChangeEventHandler
) => {
  return <F extends object>(formProps: ReturnType<GetInputProps<F>>) => {
    const { onChange: onChangeForm, ...otherProps } = formProps;

    return {
      ...otherProps,
      onChange: combineEventHandlers(onChangeForm, changeHandler),
    };
  };
};

export { combineEventHandlers, withMergeFormPropWithChangeHandler };
