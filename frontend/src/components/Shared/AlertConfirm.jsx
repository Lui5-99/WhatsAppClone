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
  return (
    <AlertDialog isOpen={show} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header style={alert.header}>
          <Text style={alert.title}></Text>
        </AlertDialog.Header>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
