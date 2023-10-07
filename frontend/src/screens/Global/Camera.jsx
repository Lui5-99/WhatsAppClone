import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { IconButton, CloseIcon, Icon } from "native-base";
import { Camera as CameraExpo, FlashMode, CameraType } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { camera } from "./styles";
import { PhotoCapture } from "../../components/Shared/PhotoCapture";

export const Camera = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const [cameraBack, setCameraBack] = useState(true);
  const cameraRef = useRef();
  const { params } = useRoute();
  const onOffFlash = () => setFlashOn((prevState) => !prevState);
  const changeTypeCamera = () => setCameraBack((prevState) => !prevState);
  const captureImage = async () => {
    const options = { quality: 1 };
    const newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };
  const onClose = () => navigation.goBack();

  if (photo) {
    return <PhotoCapture photo={photo} type={params.type} id={params.id} />;
  }

  return (
    <CameraExpo
      ref={cameraRef}
      style={camera.container}
      flashMode={flashOn ? FlashMode.torch : FlashMode.off}
      type={cameraBack ? CameraType.back : CameraType.front}
    >
      <View style={camera.topAction}>
        <IconButton
          icon={<CloseIcon style={camera.icon} />}
          onPress={onClose}
        />
        <IconButton
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name={flashOn ? "flash" : "flash-off"}
              size={6}
              style={camera.icon}
            />
          }
          onPress={onOffFlash}
        />
      </View>
      <View style={camera.bottomAction}>
        <IconButton
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name="camera"
              style={{ color: "transparent" }}
            />
          }
        />
        <IconButton
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name="circle-outline"
              size={20}
              style={camera.icon}
            />
          }
          onPress={captureImage}
        />
        <IconButton
          style={camera.iconBackground}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name="camera-flip"
              size={6}
              style={camera.icon}
            />
          }
          onPress={changeTypeCamera}
        />
      </View>
    </CameraExpo>
  );
};
