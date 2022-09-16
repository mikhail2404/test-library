import { useContext } from "react";
import styled from "styled-components";

import { StoreLocatorContext } from "../../context/StoreLocatorContext";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import IconArrow from "../../icons/IconArrow";
import IconGlobe from "../../icons/IconGlobe";
import IconPhone from "../../icons/IconPhone";

const Wrapper = styled.div`
  && {
    cursor: pointer;
    padding: 25px 30px;

    @media (min-width: 768px) {
      padding: 30px 85px;
    }
  }

  ${({ isActive }) => isActive && "background-color: #f3f3f3;"}
`;

const infoActiveCss = `
  margin-top: 30px;
  display: flex;
  padding-bottom: 5px;

  & > * {
    margin-right: 20px;
  }

  @media (min-width: 768px) {
    display: block;
    padding-bottom: 0;
    margin-top: 0;
  }
`;

const Info = styled.div`
  line-height: 15px;
  display: none;

  div {
    margin-bottom: 2px;
  }

  @media (min-width: 768px) {
    display: block;
    padding: 25px 0 0;
  }

  ${({ isActive }) => isActive && infoActiveCss}
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 900;
  line-height: 1.25;
  ${({ titleStyles }) => titleStyles && `color: ${titleStyles.color}`}
`;

const Address = styled.span`
  font-size: 12px;
  letter-spacing: 0.5px;
  color: #0b0c0d;
  display: block;
`;

const Phone = styled.a`
  font-size: 12px;
  letter-spacing: 0.5px;
  color: #0b0c0d;
  line-height: 1px;
`;

const Website = styled.a`
  font-size: 12px;
  letter-spacing: 0.5px;
  color: ${({ websiteStyles }) => websiteStyles && websiteStyles.color};
  position: relative;
  padding-bottom: 5px;

  &:after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    @media (min-width: 768px) {
      border-bottom: ${({ websiteStyles }) =>
        websiteStyles && `1px solid ${websiteStyles.borderBottomColor}`};
    }
  }
`;

const GoTo = styled.a`
  display: inline-block;
  margin-top: 5px;
`;

const Store = ({ item, mapInstance, style }) => {
  const { storeLocatorState, setActiveInfo, setStore, setZoom } =
    useContext(StoreLocatorContext);
  const { store } = storeLocatorState;
  const { titleStyles, websiteStyles } = style;
  const { windowWidth } = useWindowDimensions();
  const mobile = windowWidth < 768;
  const {
    nid,
    title,
    address,
    locality,
    country,
    phone,
    website,
    websiteUrl,
    lat,
    lng
  } = item;

  const activeClass = store.nid === nid ? "active" : "";
  const isActive = store.nid === nid;

  const handleChange = () => {
    mapInstance.setCenter({ lat, lng });
    mapInstance.setZoom(12);
    setZoom(12);
    setStore(item);
    setActiveInfo({
      id: nid,
      active: true
    });
  };

  return (
    <Wrapper
      className={`store-locator-item ${activeClass}`}
      isActive={isActive}
      id={`store-${nid}`}
      onClick={() => {
        handleChange();
      }}>
      <Title titleStyles={titleStyles} className="store-locator-item-title">
        {title}
      </Title>
      <Address className="store-locator-item-address">
        <span dangerouslySetInnerHTML={{ __html: address }} />
        {locality && `, ${locality}`}
        {country && `, ${country}`}
      </Address>
      <Info isActive={isActive} className="store-locator-item-info">
        {phone && (
          <div>
            <Phone className="store-locator-item-phone" href={`tel:${phone}`}>
              {mobile && <IconPhone />}
              {!mobile && phone}
            </Phone>
          </div>
        )}
        {websiteUrl && (
          <div>
            <Website
              websiteStyles={websiteStyles}
              className="store-locator-item-website"
              href={websiteUrl}
              target="_blank"
              rel="noreferrer">
              {mobile && websiteUrl && <IconGlobe />}
              {!mobile && <span>{website}</span>}
            </Website>
          </div>
        )}
        <div>
          <GoTo
            className="store-locator-item-direct"
            href={`https://maps.google.com/?daddr=${address}&saddr=Current%20Location`}
            target="_blank"
            rel="noreferrer">
            {mobile && <IconArrow />}
          </GoTo>
        </div>
      </Info>
    </Wrapper>
  );
};

export default Store;
