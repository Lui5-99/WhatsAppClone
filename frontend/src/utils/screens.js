const auth = {
  authStart: "AuthStart",
  login: "Login",
  Register: "Register",
};
const global = {
  camera: "Camera",
  imageFull: "ImageFull",
  userProfile: "UserProfile",
  chat: "Chat",
  group: "Group",
  groupProfile: "GroupProfile",
  addUserGroup: "AddUserGroup",
  changeName: "ChangeName",
};
const chats = {
  root: "ChatsRoot",
  chats: "Chats",
  createChat: "CreateChat",
};
const groups = {
  root: "GroupsRoot",
  createGroup: "CreateGroup",
  group: "Group",
};
const settings = {
  root: "SettingsRoot",
  changeFirstname: "ChangeFirstname",
  changeLastname: "ChangeLastname",
  settings: "Settings",
};

export const screens = {
  auth,
  global,
  tabs: {
    root: "BottomTabRoot",
    chats,
    groups,
    settings,
  },
};
