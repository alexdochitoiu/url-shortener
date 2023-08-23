import UrlModel from "@models/UrlModel";
import Container from "typedi";

export default () => {
  Container.set({ id: "UrlModel", factory: () => UrlModel });
};
