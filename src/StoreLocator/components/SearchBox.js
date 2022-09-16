import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { StoreLocatorContext } from "../../context/StoreLocatorContext";
import IconArrowLeft from "../../icons/IconArrowLeft";
import IconSearch from "../../icons/IconSearch";
import { selectPlace } from "../utils";

const Wrapper = styled.div`
  && {
    position: relative;
    margin: 23px 20px 27px;
    @media (min-width: 768px) {
      margin: 0;
      padding: 0 85px;
    }
  }
`;

const iconCss = `
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    height: 50px;
    width: 64px;
    padding: 0;
    position: absolute;
    top: -10px;
    left: -20px;

    @media (min-width: 768px) {
      top: 20px;
      left: 85px;
      height: 30px;
    }

    &:hover {
      background-color: transparent;
    }
  }
`;

const SearchIconWrapper = styled.div`
  ${iconCss}
`;

const ResetIcon = styled.button`
  ${iconCss}
`;

const Input = styled.input`
  && {
    color: #0b0c0d;
    font-size: 18px;
    padding: 5px 15px 5px 45px;
    margin-bottom: 0;

    &:focus {
      border: 1px solid transparent;
      border-bottom-color: #0b0c0d;
    }

    ${({ placeholderStyles }) =>
      placeholderStyles &&
      `&::placeholder { 
      color: ${placeholderStyles.color};
    }`}

    @media (min-width: 768px) {
      padding: 24px 70px;
      margin-bottom: 50px;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }
  }
`;

const SearchBox = ({ mapApi, fetchPlaces, fetchInput, map, style }) => {
  const {
    storeLocatorState,
    setActivePlaces,
    setClosest,
    setExtractCountry,
    setNoStoresValue,
    setQuery,
    setStore,
    setZoom
  } = useContext(StoreLocatorContext);
  const { query } = storeLocatorState;
  const { searchIconStyles, placeholderStyles } = style;
  const searchInput = useRef(null);
  const [input, setInput] = useState("");

  const defaultSettings = {
    center: { lat: 33.400982, lng: -31.629225 },
    zoom: 3
  };

  useEffect(() => {
    searchInput.current.value = String(query);
  }, [query]);

  const onKeyUp = (e) => {
    e.persist();

    if (searchInput.current.value !== "") {
      const service = new mapApi.places.AutocompleteService();

      const displaySuggestions = function (
        predictions = mapApi.places.QueryAutocompletePrediction | null,
        status = mapApi.places.PlacesServiceStatus
      ) {
        if (status !== mapApi.places.PlacesServiceStatus.OK || !predictions) {
          throw new Error(status);
        }

        fetchPlaces(predictions);

        if (e.keyCode == 13) {
          selectPlace(map, predictions[0]);
        } else {
          setActivePlaces(true);
        }
      };

      service.getQueryPredictions(
        {
          input: searchInput.current.value
        },
        displaySuggestions
      );

      setInput(searchInput.current.value);
      fetchInput(searchInput.current.value);
    } else {
      fetchPlaces([]);
      setActivePlaces(false);
      setQuery("");
      setNoStoresValue("");
    }

    setClosest(null);
  };

  const clearSearchBox = () => {
    searchInput.current.value = "";
    setInput("");

    fetchInput("");
    fetchPlaces([]);

    map.setCenter(defaultSettings.center);
    map.setZoom(defaultSettings.zoom);
    setStore({});
    setZoom(defaultSettings.zoom);
    setActivePlaces(false);
    setClosest(null);
    setQuery("");
    setNoStoresValue("");
    setExtractCountry("");
  };

  return (
    <Wrapper className="store-locator-searchBox">
      {!input ? (
        <SearchIconWrapper className="store-locator-submit">
          <IconSearch style={searchIconStyles} />
        </SearchIconWrapper>
      ) : (
        <ResetIcon
          className="store-locator-reset"
          title="Clear the search query."
          onClick={clearSearchBox}>
          <IconArrowLeft />
        </ResetIcon>
      )}
      <Input
        ref={searchInput}
        id="store-locator-input"
        type="text"
        onKeyUp={onKeyUp}
        className="store-locator-input"
        placeholder="find a store"
        placeholderStyles={placeholderStyles}
      />
    </Wrapper>
  );
};

export default SearchBox;
