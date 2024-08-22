import { credentials, vault, onboarded } from "../stores";

const logout = () => {
  credentials.set({ username: "", password: "" });
  vault.set({});
  onboarded.set(false);
};

export default logout;
