import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const alert = StyleSheet.create({
  header: {
    backgroundColor: "#171717",
    borderBottomColor: "#171717",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  body: {
    backgroundColor: "#171717",
    borderTopWidth: 1,
    borderTopColor: "#171717",
  },
  message: {
    color: "#fff",
    opacity: 0.6,
  },
  footer: {
    backgroundColor: "#171717",
    borderTopColor: "#171717",
  },
  cancel: {
    color: "#fff",
    opacity: 0.6,
  },
});

export const captureImage = StyleSheet.create({
  container: {
    position: "relative",
  },
  photo: {
    height: "100%",
    width: "100%",
  },
  topAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    left: 0,
    top: 0,
    padding: 10,
  },
  bottomAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    bottom: 50,
    left: 0,
    padding: 10,
  },
  icon: {
    color: "#fff",
  },
});
