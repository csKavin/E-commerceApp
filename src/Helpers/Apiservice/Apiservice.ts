import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL,BULK_API_KEY } from "../Config/Config";

// const {environment } = useInformationStore();

// const {profile} = useInformationStore();

const BACKENDURL: string = BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 13000,
});

instance.interceptors.request.use((request : any) => {
  const tokenData = localStorage.getItem("AccessToken");
  // const token = JSON.parse(`${tokenData}`);
  // console.log(token);
  // request.headers.Authorization = `Bearer ${token}`;
  // request.headers.Apikey = BULK_API_KEY;
  // request.headers.Apikey = process.env.NEXT_PRIVATE_KEY;
  return request;
});

instance.interceptors.response.use(
  (response : any) => {
    return response;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

let orgID = "5f4cb579227a5c41346d1397";
let type = "prod"

// let orgID = "";
// let type = "prod"
// let server = ""

// if(server == "kenverse"){
//   orgID = "5f4cb579227a5c41346d1390"
// } else {
//   orgID = "5f4cb579227a5c41346d1391"
// }
interface monitoringInterface  {
  orgId : string,
  cluster : string,
  env : string
}

interface Usage {
  orgId : string,
  cluster : string,
  nameSpace : string,
  env : string,
  time : string
}

interface memoryTable {
  orgId : string,
  cluster : string,
  nameSpace : string,
  env : string,
}

interface nameSpace {
  orgId : string,
  cluster : string,
  env : string,
}

export const clusterMonitoring = async (payload : monitoringInterface): Promise<AxiosResponse> => {
  const path = `${BACKENDURL}/v1/cluster_monitoring/${payload.orgId}/${payload.cluster}/${payload.env}`;
  const res: AxiosResponse = await instance.get(path);
  return res;
}
export const awsForecast = async (): Promise<AxiosResponse> => {
  const path = `${BACKENDURL}/v1/aws_forecast/${orgID}/${type}`;
  const res: AxiosResponse = await instance.get(path);
  return res;
}
export const awsServiceCost = async (): Promise<AxiosResponse> => {
  const path = `${BACKENDURL}/v1/aws_cost_explorer_service_name/monthly/${orgID}/${type}`;
  const res: AxiosResponse = await instance.get(path);
  return res;
}
export const awsServiceDaily = async (): Promise<AxiosResponse> => {
  const path = `${BACKENDURL}/v1/aws_cost_explorer_service_name/daily/${orgID}/${type}`;
  const res: AxiosResponse = await instance.get(path);
  return res;
}

export const NameSpacesList = async (payload : nameSpace): Promise<AxiosResponse> => {
  const path = `${BACKENDURL}/v1/get_namespaces/${payload.orgId}/${payload.cluster}/${payload.env}`;
  const res: AxiosResponse = await instance.get(path);
  return res;
}
// export const ListOfPods = async (): Promise<AxiosResponse> => {
//   const path = `${BACKENDURL}/v1/get_pods/5f4cb579227a5c41346d1390/ken_cluster_1/calico-system`;
//   const res: AxiosResponse = await instance.get(path);
//   return res;
// }
export const cpuUsage = async (payload : Usage): Promise<AxiosResponse> => {
  const path = `${BACKENDURL}/v1/cpu_usage/${payload.orgId}/${payload.cluster}/${payload.nameSpace}/all/${payload.env}/${payload.time}`;
  const res: AxiosResponse = await instance.get(path);
  return res;
}

export const memoryUsage = async (payload : Usage): Promise<AxiosResponse> => {
  const path = `${BACKENDURL}/v1/memory_usage/${payload.orgId}/${payload.cluster}/${payload.nameSpace}/all/${payload.env}/${payload.time}`;
  const res: AxiosResponse = await instance.get(path);
  return res;
}

export const cpuQuota = async (payload : memoryTable): Promise<AxiosResponse> => {
  const path = `${BACKENDURL}/v1/cpu_quota/${payload.orgId}/${payload.cluster}/all/all/${payload.env}`;
  const res: AxiosResponse = await instance.get(path);
  return res;
}

export const memoryRequest = async (payload : memoryTable): Promise<AxiosResponse> => {
  const path = `${BACKENDURL}/v1/memory_requests/${payload.orgId}/${payload.cluster}/all/all/${payload.env}`;
  const res: AxiosResponse = await instance.get(path);
  return res;
}
export const currentNetworkUsage = async (payload : memoryTable): Promise<AxiosResponse> => {
  const path = `${BACKENDURL}/v1/current_network_usage/${payload.orgId}/${payload.cluster}/${payload.nameSpace}/${payload.env}`;
  const res: AxiosResponse = await instance.get(path);
  return res;
}


//Kubernetes cost 
export const KubernetesCost = async (payload : {orgId: string,clusterId:string,kubeCluster:string}) => {
  const path = `${BACKENDURL}/v1/kube_cost/${payload.orgId}/${payload.clusterId}/${payload.kubeCluster}`;
  const res: AxiosResponse = await instance.get(path);
  return res;
}
export const KubernetesNameSpaces = async (payload : {orgId: string,clusterId:string,kubeCluster:string}) => {
  const path = `${BACKENDURL}/v1/kubecost_namespaces/${payload.orgId}/${payload.clusterId}/${payload.kubeCluster}`;
  const res: AxiosResponse = await instance.get(path);
  return res;
}
export const KubernetesNameAllocations = async (payload : {orgId: string,clusterId:string,kubeCluster:string}) => {
  const path = `${BACKENDURL}/v1/allocations/${payload.orgId}/${payload.clusterId}/${payload.kubeCluster}`;
  const res: AxiosResponse = await instance.get(path);
  return res;
}




