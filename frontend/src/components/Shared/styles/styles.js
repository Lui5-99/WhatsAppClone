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
