import { StyleSheet } from "react-native";

export const stylesAuth = StyleSheet.create({
  content: {
    flex: 1,
    margin: 20,
    marginTop: 0,
    justifyContent: "space-between",
  },
  img: {
    width: "10",
    height: 400,
    resizeMode: "contain",
    marginVertical: 20,
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    color: "#fff",
    opacity: 0.6,
    textAlign: "center",
    marginBottom: 20,
  },
  btn: {
    color: "#0891b2",
    fontWeight: "600",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 30,
  },
});

export const stylesLogin = StyleSheet.create({
  content: {
    margin: 20,
  },
  title: {
    color: "#fff",
    marginVertical: 15,
    opacity: 0.6,
  },
  register: {
    color: "#0891b2",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 30,
  },
  info: {
    color: "#fff",
    marginVertical: 15,
    opacity: 0.6,
    textAlign: "center",
  },
});

export const stylesRegister = StyleSheet.create({
  content: {
    margin: 20,
  },
  title: {
    color: "#fff",
    marginVertical: 15,
    opacity: 0.6,
  },
  login: {
    color: "#0891b2",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 30,
  },
});
