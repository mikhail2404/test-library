import { useReducer } from "react";

import { StoreLocatorContext } from "./StoreLocatorContext";
import { storeLocatorReducer } from "./storeLocatorReducer";

const initialState = {
  query: "",
  currentGeolocation: false,
  activePlaces: false,
  activeInfo: {
    active: false,
    id: null
  },
  zoom: 3,
  store: {},
  closest: null,
  noStoresValue: "",
  extractCountry: "",
  zooming: false
};

export const StoreLocatorProvider = ({ children }) => {
  const [storeLocatorState, dispatch] = useReducer(
    storeLocatorReducer,
    initialState
  );
  const setQuery = (query) => {
    dispatch({ type: "SET_QUERY", payload: query });
  };
  const setCurrentGeolocation = (currentGeolocation) => {
    dispatch({ type: "SET_CURRENT_GEOLOCATION", payload: currentGeolocation });
  };
  const setActivePlaces = (activePlaces) => {
    dispatch({ type: "SET_CURRENT_GEOLOCATION", payload: activePlaces });
  };
  const setActiveInfo = (activeInfo) => {
    dispatch({ type: "SET_ACTIVE_INFO", payload: activeInfo });
  };
  const setZoom = (zoom) => {
    dispatch({ type: "SET_ZOOM", payload: zoom });
  };
  const setZooming = (zooming) => {
    dispatch({ type: "SET_ZOOMING", payload: zooming });
  };
  const setStore = (store) => {
    dispatch({ type: "SET_STORE", payload: store });
  };
  const setClosest = (closest) => {
    dispatch({ type: "SET_CLOSEST", payload: closest });
  };
  const setNoStoresValue = (noStoresValue) => {
    dispatch({ type: "SET_NO_STORES_VALUE", payload: noStoresValue });
  };
  const setExtractCountry = (extractCountry) => {
    dispatch({ type: "SET_EXTRACT_COUNTRY", payload: extractCountry });
  };

  return (
    <StoreLocatorContext.Provider
      value={{
        storeLocatorState,
        setQuery,
        setCurrentGeolocation,
        setActivePlaces,
        setActiveInfo,
        setZoom,
        setZooming,
        setStore,
        setClosest,
        setNoStoresValue,
        setExtractCountry
      }}>
      {children}
    </StoreLocatorContext.Provider>
  );
};
