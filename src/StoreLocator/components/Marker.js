import { useContext, useState } from "react";
import PropTypes from "prop-types";

import { StoreLocatorContext } from "../../context/StoreLocatorContext";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import IconCity from "../../icons/IconCity";
import IconCityActive from "../../icons/IconCityActive";
import IconPin from "../../icons/IconPin";

import InfoMap from "./InfoMap";

const Marker = ({ onClick, item, haversineDistance, style, storeLabel }) => {
  const { windowWidth } = useWindowDimensions();
  const { storeLocatorState, setActiveInfo } = useContext(StoreLocatorContext);
  const { activeZoom, activeInfo, store } = storeLocatorState;
  const { activeCityIconStyles, cityIconStyles, pinIconStyles } = style;
  const { nid, show } = item;
  const [active, setActive] = useState(false);

  const handleClick = (item, type) => {
    setActive(!active);
    onClick(item, type);
    setActiveInfo({
      id: nid,
      active: !activeInfo.active
    });
  };

  return (
    <>
      {activeZoom >= 5 &&
        (store.nid === nid ? (
          <IconCityActive
            activeCityIconStyles={activeCityIconStyles}
            storeLabel={storeLabel}
            onClick={handleClick}
            item={item}
          />
        ) : (
          <IconCity
            cityIconStyles={cityIconStyles}
            storeLabel={storeLabel}
            onClick={handleClick}
            item={item}
          />
        ))}

      {activeZoom < 5 && show && (
        <IconPin pinIconStyles={pinIconStyles} onClick={onClick} item={item} />
      )}

      {activeInfo.id === nid && activeInfo.active && windowWidth > 768 && (
        <InfoMap item={item} haversineDistance={haversineDistance} />
      )}
    </>
  );
};

Marker.defaultProps = {
  onClick: null
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired
};

export default Marker;
