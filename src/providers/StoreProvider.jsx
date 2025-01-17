import { Provider } from "react-redux";
import { store } from "../libs/services/store";

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
