import { useState } from "react";
import { useAuth } from "../../hooks";
import { IconButton, AddIcon, Actionsheet } from "native-base";
import { sendMedia } from "./styles";
import { GalleryOption } from "./options";
import { CameraOption } from "./options/CameraOption";

export const SendMedia = ({ chatId }) => {
  const { accessToken } = useAuth();
  const [show, setShow] = useState(false);

  const onOpenClose = () => setShow((prevState) => !prevState);

  return (
    <>
      <IconButton icon={<AddIcon />} padding={0} onPress={onOpenClose} />
      <Actionsheet isOpen={show} onClose={onOpenClose}>
        <Actionsheet.Content style={sendMedia.itemsContainer}>
          <CameraOption
            onClose={onOpenClose}
            chatId={chatId}
            accessToken={accessToken}
          />
          <GalleryOption
            onClose={onOpenClose}
            chatId={chatId}
            accessToken={accessToken}
          />
          <Actionsheet.Item
            style={[sendMedia.option, sendMedia.cancel]}
            _text={sendMedia.cancelText}
            onPress={onOpenClose}
          >
            Cancelar
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
