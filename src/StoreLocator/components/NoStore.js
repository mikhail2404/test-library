import { useContext } from "react";
import styled from "styled-components";

import { StoreLocatorContext } from "../../context/StoreLocatorContext";
import {
  tExpandSearch,
  tLookFurtherAway,
  tNoNearbyStores,
  tNoStores
} from "../translations";

const Wrapper = styled.div`
  && {
    padding: 25px 30px 5px;
    @media (min-width: 768px) {
      padding: 25px 85px;
    }
  }
`;

const Title = styled.span`
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2.75px;
  color: #0b0c0d;
  display: block;
`;

const Description = styled.span`
  font-size: 12px;
  line-height: 1.33;
  letter-spacing: 0.25px;
  color: #0b0c0d;
  margin-bottom: 50px;
`;

const ExpandButton = styled.button`
  margin-top: 50px;
  text-transform: uppercase;
  ${({ expandButtonStyles }) =>
    expandButtonStyles &&
    `
    background: ${expandButtonStyles.background};
    border: ${expandButtonStyles.border};
    &:hover{
      background: ${expandButtonStyles.hoverBackground};
    }
  `}
`;

const StoresNoItem = ({ getNearestDivvyStation, expandButtonStyles }) => {
  const { storeLocatorState } = useContext(StoreLocatorContext);
  const { closest } = storeLocatorState;

  return (
    <Wrapper className="store-locator-no-items">
      <Title className="store-locator-no-items-title">{tNoStores}</Title>
      {closest === null && (
        <Description className="store-locator-no-items-description">
          {tLookFurtherAway}
        </Description>
      )}
      {closest !== null && (
        <Description className="store-locator-no-items-description">
          {tNoNearbyStores}
        </Description>
      )}
      {closest === null && (
        <ExpandButton
          expandButtonStyles={expandButtonStyles}
          onClick={getNearestDivvyStation}>
          {tExpandSearch}
        </ExpandButton>
      )}
    </Wrapper>
  );
};

export default StoresNoItem;
