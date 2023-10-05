import { StyleSheet } from "react-native";

export const stylesChat = StyleSheet.create({
  content: {
    paddingHorizontal: 10,
    marginBottom: 50,
    paddingBottom: 50,
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 10,
    alignItems: "center",
  },
  avatar: {},
  info: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 16,
  },
  email: {
    color: "#fff",
    opacity: 0.6,
    marginTop: 2,
  },
});

export const stylesSearch = StyleSheet.create({
  content: {
    padding: 10,
  },
  input: {
    backgroundColor: "#29292b",
    color: "#fff",
    fontSize: 16,
    borderRadius: 10,
  },
});

export const stylesList = StyleSheet.create({
  content: {
    paddingBottom: 100,
  },
  noChats: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    opacity: 0.4,
    fontSize: 16,
    marginHorizontal: 40,
  },
});

export const stylesItem = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    height: 80,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  infoContent: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 10,
    justifyContent: "space-between",
    height: "100%",
  },
  info: {
    flex: 1,
  },
  identity: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  message: {
    color: "#fff",
    opacity: 0.4,
    fontSize: 15,
  },
  unReadContent: {
    backgroundColor: "#06b6d4",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
  },
  unRead: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
  notify: {
    alignItems: "flex-end",
  },
  time: {
    opacity: 0.6,
    color: "#fff",
    fontSize: 12,
    marginBottom: 5,
  },
});

export const styleMessages = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  content: {
    paddingBottom: 150,
  },
});

export const styleText = (isMe) => {
  return StyleSheet.create({
    content: {
      flexDirection: "row",
      justifyContent: isMe ? "flex-end" : "flex-start",
      marginHorizontal: 10,
      marginBottom: 10,
    },
    message: {
      flex: 1,
      backgroundColor: isMe ? "#0891b2" : "#202333",
      maxWidth: "80%",
      borderRadius: 10,
      paddingVertical: 6,
      paddingHorizontal: 10,
    },
    textMessage: {
      color: "#fff",
    },
    date: {
      opacity: 0.6,
      color: "#fff",
      fontSize: 12,
      marginTop: 2,
      textAlign: "right",
    },
  });
};

export const styleImage = (isMe) => {
  return {
    content: {
      flexDirection: "row",
      justifyContent: isMe ? "flex-end" : "flex-start",
      marginHorizontal: 10,
      marginBottom: 10,
    },
    message: {
      flex: 1,
      backgroundColor: isMe ? "#0891b2" : "#202333",
      maxWidth: "80%",
      borderRadius: 10,
      paddingVertical: 6,
      paddingHorizontal: 10,
    },
    textMessage: {
      color: "#fff",
    },
    date: {
      opacity: 0.6,
      color: "#fff",
      fontSize: 12,
      marginTop: 2,
      textAlign: "right",
    },
  };
};
