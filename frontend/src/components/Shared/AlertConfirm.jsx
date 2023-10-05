import { useState } from "react";
import { Text } from "react-native";
import { alert } from "./styles";
import { AlertDialog, Button } from "native-base";

export const AlertConfirm = ({
  show,
  onClose,
  title,
  message,
  textConfirm,
  onConfirm,
  isDanger,
}) => {
  const [loading, setLoading] = useState(false);
  const onConfirmWrapper = () => {
    setLoading(true);
    onConfirm();
  };
  return (
    <AlertDialog isOpen={show} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header style={alert.header}>
          <Text style={alert.title}>{title}</Text>
        </AlertDialog.Header>
        <AlertDialog.Body style={alert.body}>
          <Text style={alert.message}>{message}</Text>
        </AlertDialog.Body>
        <AlertDialog.Footer style={alert.footer}>
          <Button.Group space={2}>
            <Button variant="unstyled" onPress={onClose} _text={alert.cancel}>
              Cancelar
            </Button>
            <Button
              colorScheme={isDanger ? "danger" : "cyan"}
              onPress={onConfirmWrapper}
              isLoading={loading}
            >
              {textConfirm}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
