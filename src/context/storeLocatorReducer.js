export const storeLocatorReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_CURRENT_GEOLOCATION":
      return { ...state, currentGeolocation: action.payload };
    case "SET_ACTIVE_PLACES":
      return { ...state, activePlaces: action.payload };
    case "SET_ACTIVE_INFO":
      return { ...state, activeInfo: action.payload };
    case "SET_ZOOM":
      return { ...state, zoom: action.payload };
    case "SET_ZOOMING":
      return { ...state, zooming: action.payload };
    case "SET_STORE":
      return { ...state, store: action.payload };
    case "SET_CLOSEST":
      return { ...state, closest: action.payload };
    case "SET_NO_STORES_VALUE":
      return { ...state, noStoresValue: action.payload };
    case "SET_EXTRACT_COUNTRY":
      return { ...state, extractCountry: action.payload };
    default:
      return state;
  }
};
