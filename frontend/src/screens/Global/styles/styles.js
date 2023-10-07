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

export const camera = StyleSheet.create({
  container: {
    height: "100%",
  },
  topAction: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  iconBackground: {
    backgroundColor: "#202020",
    borderRadius: 50,
  },
});
