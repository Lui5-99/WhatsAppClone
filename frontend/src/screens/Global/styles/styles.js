import { StyleSheet } from "react-native";

export const userProfile = StyleSheet.create({
  content: {
    alignItems: "center",
    marginTop: 10,
  },
  identity: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
  },
  email: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
    opacity: 0.6,
  },
});

export const imageFull = StyleSheet.create({
  content: { position: "relative" },
  btn: {
    position: "absolute",
    top: 40,
    right: 20,
  },
});
