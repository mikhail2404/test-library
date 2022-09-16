import { useContext, useEffect, useState } from "react";
import Geocode from "react-geocode";
import styled from "styled-components";

import { StoreLocatorContext } from "../context/StoreLocatorContext";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

import GoogleMap from "./components/GoogleMap";
import LoadingSpinner from "./components/Loader";
import Marker from "./components/Marker";
import Places from "./components/Places";
import SearchBox from "./components/SearchBox";
import Stores from "./components/Stores";

const GOOGLE_MAP_API = drupalSettings.google_map_api_key;

Geocode.setApiKey(GOOGLE_MAP_API);

const Wrapper = styled.div`
  && {
    display: flex;
    flex-direction: column;
    height: 900px;

    @media (min-width: 768px) {
      flex-direction: row;
    }

    & > .spinner {
      width: 100%;
      left: 0;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Loader = styled(LoadingSpinner)`
  position: unset;
`;

const Sidebar = styled.div`
  background: white;

  @media (min-width: 768px) {
    min-width: 500px;
    max-width: 500px;
    padding: 45px 0 0;
  }
`;

const Main = styled.div`
  && {
    height: 285px;
    width: 100%;

    @media (min-width: 768px) {
      height: 100%;
    }

    & > div {
      height: 285px !important;

      @media (min-width: 768px) {
        height: 100% !important;
      }
    }
  }
`;

const StoreLocator = ({ storeLocatorStyles, storeLabel }) => {
  const { windowWidth } = useWindowDimensions();
  const {
    searchBoxStyles,
    storesStyles,
    markerStyles,
    storeStyles,
    noStoresStyles
  } = storeLocatorStyles;
  const {
    storeLocatorState,
    setCurrentGeolocation,
    setActivePlaces,
    setZoom,
    setStore,
    setClosest,
    setQuery,
    setNoStoresValue,
    setActiveInfo,
    setExtractCountry,
    setZooming
  } = useContext(StoreLocatorContext);
  const {
    activePlaces,
    query,
    activeZoom,
    zooming,
    noStoresValue,
    extractCountry
  } = storeLocatorState;

  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapApi, setMapApi] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [places, setPlaces] = useState([]);
  const [changeCenter, setChangeCenter] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const defaultSettings = {
    center:
      windowWidth < 768 ? [46.525605, 22.728699] : [33.400982, -31.629225],
    zoom: 3
  };

  useEffect(() => {
    const mainQuery = query.split(",").shift().trim();

    if (extractCountry === "") {
      filterData(mainQuery);
    }
  }, [query, extractCountry]);

  useEffect(() => {
    const layout = document.querySelector(".layout-content");

    layout.style.padding = 0;

    fetchData();
  }, []);

  const fetchData = () => {
    fetch("/store-locator-json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const newData = data.map((item) => {
          const {
            field_store_address_country_code: country,
            field_store_address_locality: locality,
            field_store_address_address_line1: address,
            field_store_address_administrative_area: administrativeArea,
            field_store_address_postal_code: postalCode,
            field_store_geolocation: lat,
            field_store_geolocation_1: lng,
            field_store_email: email,
            field_store_phone: phone,
            field_store_website_1: website,
            field_store_website: websiteUrl,
            title,
            nid,
            body
          } = item;

          return {
            country,
            postalCode,
            lat: +lat,
            lng: +lng,
            nid,
            title: title.replace("&#039;", "'").replace("&amp;", "&"),
            body,
            email,
            phone,
            locality: locality.replace("&#039;", ""),
            administrativeArea,
            website,
            websiteUrl,
            address
          };
        });

        const countriesCount = newData.reduce((a, { country }) => {
          a[country] = a[country] || { count: 0 };
          a[country].count += 1;

          return a;
        }, {});

        const result = newData.map((item, index, self) => {
          const { country } = item;

          return {
            ...item,
            count: countriesCount[country].count,
            show:
              index === self.findIndex((t) => t.country === item.country) ||
              false
          };
        });

        setAllData(result);
        setLoading(false);
      });
  };

  const apiHasLoaded = (map, maps) => {
    setMapApiLoaded(true);
    setMapInstance(map);
    setMapApi(maps);

    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        const { longitude: lng, latitude: lat } = coords;

        setCurrentGeolocation(true);
        map.setCenter({ lat, lng });
        map.setZoom(12);

        setCurrentLocation({ lng, lat });
      });
    }
  };

  const filterData = (value) => {
    const result = allData.filter((data) => {
      const { address, country, locality } = data;
      const inAddress = address.toLowerCase().includes(value.toLowerCase());
      const inCountry = country.toLowerCase().includes(value.toLowerCase());
      const inLocality = locality.toLowerCase().includes(value.toLowerCase());

      return inAddress || inCountry || inLocality;
    });

    setFilteredData(result);
  };

  const fetchPlaces = (data) => {
    setPlaces(data);
  };

  const fetchInput = (value) => {
    setInput(value);

    if (value === "") {
      setActivePlaces(false);
    }
  };

  const checkCountryCenter = (item = {}, value = "") => {
    const { country } = item;

    const countriesCoords = allData
      .filter((data) => data.country === (country || value))
      .map((item) => {
        return {
          lat: item.lat,
          lng: item.lng
        };
      });

    const latMin = Math.min(...countriesCoords.map((item) => item.lat));
    const latMax = Math.max(...countriesCoords.map((item) => item.lat));

    const lngMin = Math.min(...countriesCoords.map((item) => item.lng));
    const lngMax = Math.max(...countriesCoords.map((item) => item.lng));

    const lat = (latMin + latMax) / 2;
    const lng = (lngMin + lngMax) / 2;

    return { lat, lng };
  };

  const onClick = ({ item, type }) => {
    const { nid, lat, lng, count } = item;

    if (type === "country") {
      if (count > 1) {
        mapInstance.panTo({
          lat: checkCountryCenter(item).lat,
          lng: checkCountryCenter(item).lng
        });
      } else {
        mapInstance.panTo({ lat, lng });
      }

      mapInstance.setZoom(6);
      setZoom(6);
    } else {
      setStore(item);
      mapInstance.setCenter({ lat, lng });

      if (activeZoom <= 12) {
        mapInstance.setZoom(12);
        setZoom(12);
      }

      scrollIfNeeded(
        document.getElementById(`store-${nid}`),
        document.getElementById("stores-container")
      );
    }
  };

  const getGeocodeData = (response) => {
    let cityGeoCode, countryGeoCode;

    for (let i = 0; i < response.results[0].address_components.length; i++) {
      for (
        let j = 0;
        j < response.results[0].address_components[i].types.length;
        j++
      ) {
        switch (response.results[0].address_components[i].types[j]) {
          case "locality":
            cityGeoCode = response.results[0].address_components[i].long_name;
            break;
          case "country":
            countryGeoCode =
              response.results[0].address_components[i].long_name;
            break;
        }
      }
    }

    return {
      city: cityGeoCode,
      country: countryGeoCode
    };
  };

  const getNearestDivvyStation = () => {
    const { lat, lng } = changeCenter;

    if (!noStoresValue) {
      mapInstance.setCenter({ lat, lng });

      mapInstance.setZoom(7);
      setZoom(7);

      setClosest(!!filteredData.length);
      setQuery("");
      setNoStoresValue("");
    } else {
      Geocode.fromAddress(noStoresValue).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;

          mapInstance.setCenter({ lat, lng });
          mapInstance.setZoom(7);
          setZoom(7);
          setNoStoresValue("");
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const handleClickMap = () => {
    setZoom(mapInstance.getZoom());

    setActiveInfo({
      id: null,
      active: false
    });
  };

  const onChange = ({ center, bounds }) => {
    const { ne, nw, se, sw } = bounds;
    const { lat, lng } = center;

    setChangeCenter(center);
    setClosest(null);

    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const { country } = getGeocodeData(response);

        setExtractCountry(country);
      },
      (error) => {
        console.error(error);
      }
    );

    if (allData) {
      const data = allData.filter((marker) => {
        return (
          marker.lat > se.lat &&
          sw.lat &&
          marker.lat < ne.lat &&
          nw.lat &&
          marker.lng > nw.lng &&
          sw.lng &&
          marker.lng < ne.lng &&
          se.lng
        );
      });

      setZooming(true);
      setFilteredData(data);
    }
  };

  const handleZoomChanged = () => {
    setZoom(mapInstance.getZoom());

    if (mapInstance.getZoom() !== 12) {
      setActiveInfo({
        id: null,
        active: false
      });
    }
  };

  const setData =
    noStoresValue.length !== 0 || zooming ? filteredData : allData;

  const haversineDistance = (latLng) => {
    const lat = [currentLocation.lat, latLng.lat];
    const lng = [currentLocation.lng, latLng.lng];
    const RADIUS = 6378137;
    const directionLat = ((lat[1] - lat[0]) * Math.PI) / 180;
    const directionLng = ((lng[1] - lng[0]) * Math.PI) / 180;
    const a =
      Math.sin(directionLat / 2) * Math.sin(directionLat / 2) +
      Math.cos((lat[0] * Math.PI) / 180) *
        Math.cos((lat[1] * Math.PI) / 180) *
        Math.sin(directionLng / 2) *
        Math.sin(directionLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = RADIUS * c;
    const convertToKm = (Math.round(d) / 1000) * 1.609344;

    return Math.round(convertToKm);
  };

  const scrollIfNeeded = (element, container) => {
    container.scrollTop = element.offsetTop - container.offsetTop;
  };

  return (
    <Wrapper className="store-locator">
      {loading ? (
        <Loader
          className="spinner"
          orderItemLoader
          extend={90}
          extendMobile={40}
        />
      ) : (
        <>
          <Sidebar id="store-locator-sidebar" className="store-locator-sidebar">
            {mapApiLoaded && (
              <SearchBox
                map={mapInstance}
                mapApi={mapApi}
                fetchPlaces={fetchPlaces}
                fetchInput={fetchInput}
                style={searchBoxStyles}
              />
            )}

            {activePlaces && (
              <Places places={places} input={input} mapInstance={mapInstance} />
            )}

            {!activePlaces && windowWidth > 768 && (
              <Stores
                data={setData}
                getNearestDivvyStation={getNearestDivvyStation}
                mapInstance={mapInstance}
              />
            )}
          </Sidebar>
          <Main className="store-locator-main">
            <GoogleMap
              defaultZoom={defaultSettings.zoom}
              defaultCenter={defaultSettings.center}
              onClick={handleClickMap}
              onZoomAnimationStart={handleZoomChanged}
              onZoomAnimationEnd={handleZoomChanged}
              onDragEnd={handleZoomChanged}
              onChange={({ center, zoom, bounds, marginBounds }) =>
                onChange({ center, zoom, bounds, marginBounds })
              }
              bootstrapURLKeys={{
                key: GOOGLE_MAP_API,
                libraries: ["places"]
              }}
              gestureHandling="cooperative"
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}>
              {setData.map((place, index) => {
                const { lat, lng, title } = place;

                return (
                  <Marker
                    key={index}
                    text={title}
                    item={place}
                    mapInstance={mapInstance}
                    onClick={onClick}
                    haversineDistance={haversineDistance}
                    lat={activeZoom < 5 ? checkCountryCenter(place).lat : lat}
                    lng={activeZoom < 5 ? checkCountryCenter(place).lng : lng}
                    style={markerStyles}
                    storeLabel={storeLabel}
                  />
                );
              })}
            </GoogleMap>
          </Main>
          {windowWidth < 768 && (
            <Stores
              data={setData}
              mapInstance={mapInstance}
              getNearestDivvyStation={getNearestDivvyStation}
              style={storesStyles}
              storeStyles={storeStyles}
              noStoresStyles={noStoresStyles}
            />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default StoreLocator;
