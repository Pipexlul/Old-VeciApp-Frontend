import { Text, Badge } from "@mantine/core";
import type { OpenConfirmModal } from "@mantine/modals/lib/context";

const confirmModals = {
  register: (
    userType: string,
    confirmFunc: () => void,
    cancelFunc: () => void
  ): OpenConfirmModal => {
    return {
      title: "Confirmar tipo de registro",
      children: (
        <>
          <Text size="sm">Estás a punto de crear una cuenta de tipo </Text>
          <Badge my="sm" size="lg" variant="outline">
            {userType === "owner" ? "Propietario" : "Cliente"}
          </Badge>
          <Text size="sm">¿Continuar?</Text>
        </>
      ),
      labels: {
        confirm: "Confirmar",
        cancel: "Cancelar",
      },
      onConfirm: confirmFunc,
      onCancel: cancelFunc,
    };
  },
};

export { confirmModals };
