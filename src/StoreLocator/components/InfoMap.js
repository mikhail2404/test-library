import { useContext } from "react";
import styled from "styled-components";

import { StoreLocatorContext } from "../../context/StoreLocatorContext";
import IconArrow from "../../icons/IconArrow";

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  width: 407px;
  padding: 25px 30px 30px 30px;
  transform: translate(-50%, 50px);
  position: relative;
  z-index: 100;
  letter-spacing: 0.5px;
  font-family: "Lab Grotesque";
  color: #0b0c0d;
`;

const Info = styled.div`
  margin-right: 30px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 900;
  line-height: 1.25;
`;

const Address = styled.div`
  font-size: 12px;
  margin-bottom: 20px;
`;

const Phone = styled.a`
  font-size: 9px;
  margin-bottom: 3px;
`;

const Webpage = styled.a`
  font-size: 10px;
  border-bottom: 1px solid #0b0c0d;
  padding-top: 5px;
  padding-bottom: 3px;
`;

const GoTo = styled.a`
  text-align: center;
`;

const Distance = styled.div`
  font-size: 9px;
  font-weight: 900;
  margin-top: 5px;
  letter-spacing: 2px;
`;

const InfoMap = ({ item, haversineDistance }) => {
  const { storeLocatorState } = useContext(StoreLocatorContext);
  const { currentGeolocation } = storeLocatorState;

  const {
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

  return (
    <Wrapper>
      <Info>
        <Title>{title}</Title>
        <Address>
          <span dangerouslySetInnerHTML={{ __html: address }} />
          {locality && `, ${locality}`}
          {country && `, ${country}`}
        </Address>
        <Phone href={`tel:${phone}`}>{phone}</Phone>
        <div>
          <Webpage
            href={websiteUrl}
            target="_blank"
            dangerouslySetInnerHTML={{ __html: website }}
            rel="noreferrer"
          />
        </div>
      </Info>
      {currentGeolocation && (
        <div>
          <GoTo
            href={`https://maps.google.com/?daddr=${address}&saddr=Current%20Location`}
            target="_blank"
            rel="noreferrer">
            <IconArrow />
            <Distance>{haversineDistance({ lat, lng })} km</Distance>
          </GoTo>
        </div>
      )}
    </Wrapper>
  );
};

export default InfoMap;
