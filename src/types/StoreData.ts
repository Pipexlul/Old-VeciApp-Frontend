interface BaseStoreData {
  store_id: number;
  store_name: string;
  owner_name: string;
  lat: number;
  lng: number;
}

interface StoreDataListElement extends Omit<BaseStoreData, "lat" | "lng"> {
  distance: number;
}

export type { BaseStoreData, StoreDataListElement };
