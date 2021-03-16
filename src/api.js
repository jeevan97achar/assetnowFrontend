import { get } from "./productactions";
export function productgetapi(props) {
  props.dispatch(
    get("http://3.22.17.212:9000/api/v1/resManager/address/states/", "")
  );
}
