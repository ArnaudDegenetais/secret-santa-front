import { Store } from "@tanstack/store";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  wishes: string;
  role: string;
}

export const userStore = new Store<User>({
  firstName: "",
  lastName: "",
  email: "",
  wishes: "",
  role: "",
});

export default userStore;