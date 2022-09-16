import Highlighter from "react-highlight-words";
import styled from "styled-components";

import { selectPlace } from "../utils";

const Wrapper = styled.div`
  cursor: pointer;
  font-size: 11px;
  letter-spacing: 2.75px;
  color: #0b0c0d;
  padding: 15px 0;
  border-bottom: 1px solid rgba(#0b0c0d, 0.1);

  @media (min-width: 768px) {
    border-bottom: 0;
  }

  &:last-child {
    border-bottom: 0;
  }
`;

const Place = ({ place, input, mapInstance }) => {
  const values = input.split(" ").length === 1 ? [input] : input.split(" ");

  const handleClick = () => {
    selectPlace(mapInstance, place);
  };

  return (
    <Wrapper className="store-locator-place" onClick={handleClick}>
      <Highlighter
        highlightClassName="highlight"
        searchWords={values}
        autoEscape={true}
        highlightTag={"strong"}
        textToHighlight={place.description}
      />
    </Wrapper>
  );
};

export default Place;
