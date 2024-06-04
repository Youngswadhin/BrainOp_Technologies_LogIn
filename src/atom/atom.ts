import { atom } from "recoil";
import { postType, userType } from "../types/types";

export const userAtom = atom<userType>({
  default: {
    id: "",
    username: "",
    name: "",
    email: "",
    password: "",
    profilePicture: "",
  },
  key: "userAtom",
});

export const authAtom = atom<boolean>({
  default: false,
  key: "authAtom",
});

export const loadingAtom = atom<boolean>({
  default: false,
  key: "loadingAtom",
});

export const postAtom = atom<postType[]>({
  default: [],
  key: "postAtom",
});
