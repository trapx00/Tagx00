import { Instance } from "../../instance/Instance";
import { PagingInfo } from "../../PagingInfo";

export interface InstanceResponse {
  instances: Instance[];
  pagingInfo: PagingInfo;
}
