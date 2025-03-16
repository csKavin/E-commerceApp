import { create } from "zustand";

// Define the state types
interface CounterState {
  orgId: string;
  env: string;
  cluster: string;
  setCluster: (id: string) => void;
  setOrgId: (id: string) => void;
  setEnv: (environment: string) => void;
}

// Create a store
const useCounterStore = create<CounterState>((set) => ({
  orgId: '5f4cb579227a5c41346d1390',
  env: 'dev',
  cluster : 'ken_cluster_1',
  setOrgId: (id: string) => set(() => ({ orgId: id })),
  setCluster: (id: string) => set(() => ({ cluster: id })),
  setEnv: (environment: string) => set(() => ({ env: environment })),
}));

export default useCounterStore;
