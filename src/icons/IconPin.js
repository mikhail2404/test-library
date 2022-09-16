import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 25px;
  height: 35px;
  transform: translate(-50%, -100%);
  span {
    border-radius: 100%;
    background-color: ${({ pinIconStyles }) =>
      pinIconStyles && pinIconStyles.backgroundColor};
    color: white;
    width: 20px;
    height: 20px;
    position: absolute;
    top: -5px;
    right: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
`;

const IconPin = ({ item, onClick, pinIconStyles }) => {
  const { count } = item;

  return (
    <Wrapper onClick={() => onClick({ item, type: "country" })}>
      {count > 1 && <span>{count}</span>}
      <svg
        width={25}
        height={35}
        viewBox="0 0 31 45"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd">
          <g id="placeholder" fill={pinIconStyles.fill} fillRule="nonzero">
            <path
              // eslint-disable-next-line max-len
              d="M15.5,0 C6.9533626,0 0,6.9533626 0,15.5 C0,26.2422213 15.5152415,44.5920983 15.5152415,44.5920983 C15.5152415,44.5920983 31,25.7139421 31,15.5 C31,6.9533626 24.0469096,0 15.5,0 Z M20.1766725,20.0384109 C18.8871379,21.3276734 17.193705,21.9724408 15.5,21.9724408 C13.8065672,21.9724408 12.11259,21.3276734 10.8235996,20.0384109 C8.24480244,17.4598859 8.24480244,13.2641352 10.8235996,10.685338 C12.072309,9.43608432 13.7333538,8.74804218 15.5,8.74804218 C17.2666462,8.74804218 18.9274188,9.43635647 20.1766725,10.685338 C22.7554697,13.2641352 22.7554697,17.4598859 20.1766725,20.0384109 Z"
              id="Shape"
            />
          </g>
        </g>
      </svg>
    </Wrapper>
  );
};

export default IconPin;
