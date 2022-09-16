import styled, { css } from "styled-components";

export const Overlay = styled.div`
  display: flex;
  width: ${(props) =>
    props.extend ? `calc(100% + ${props.extend}px)` : "100%"};
  height: 100%;
  position: ${(props) => (props.desktopFixed ? "fixed" : "absolute")};
  top: 0;
  left: ${(props) => (props.extend ? `-${props.extend / 2}px` : "0")};
  z-index: ${(props) => (props.zIndex ? props.zIndex : 13)};
  background: rgba(255, 255, 255, 0.9);

  @media screen and (max-width: 575px) {
    width: ${(props) =>
      props.extendMobile ? `calc(100% + ${props.extendMobile}px)` : "100%"};
    left: ${(props) =>
      props.extendMobile ? `-${props.extendMobile / 2}px` : "0"};
    position: ${(props) => props.mobileSticky && "sticky"};
    height: ${(props) => props.mobileSticky && "100vh"};
    margin-left: ${(props) => props.mobileSticky && "-20px"};
  }
`;

const orderItemMessage = (props) =>
  props.orderItemLoader &&
  css`
    width: auto;

    top: 69px;
    left: 185px;
    font-size: 9px;
    font-weight: 900;

    padding-top: 40px;

    @media screen and (max-width: 575px) {
      top: auto;
      left: 145px;
      padding-top: 0;
      bottom: 37px;
    }
  `;

const orderItemLoader = (props) =>
  props.orderItemLoader &&
  css`
    left: 60px;
    top: 39px;

    @media screen and (max-width: 575px) {
      left: 42px;
      top: 50%;
      transform: translateY(-50%);
    }
  `;

export const LoaderMessage = styled.div`
  position: absolute;
  top: calc(50% + 70px);

  width: 100%;
  margin-left: auto;
  margin-right: auto;

  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;

  background: #fff;

  ${orderItemMessage}
`;

export const LoaderWrapper = styled.div`
  width: 10em;
  height: 10em;
  left: calc(50% - 45px);
  top: calc(50% - 45px);
  font-size: 9px;
  position: relative;
  background-color: #fff;

  ${orderItemLoader}
`;

export const Loader = styled.div`
  display: inherit;
  border-radius: 50%;
  color: #000000;
  font-size: 9px;
  text-indent: -99999em;
  position: relative;
  width: 10em;
  height: 10em;
  box-shadow: inset 0 0 0 1em;
  transform: translateZ(0);
  background: #fff;

  &:before,
  &:after {
    position: absolute;
    display: inherit;
    border-radius: 50%;
    content: "";
  }
  &:before {
    width: 5.2em;
    height: 10.2em;
    background: #fff;
    border-radius: 10.2em 0 0 10.2em;
    top: -0.1em;
    left: -0.1em;
    transform-origin: 5.1em 5.1em;
    animation: load2 2s infinite ease 1.5s;
  }
  &:after {
    width: 5.2em;
    height: 10.2em;
    background: #fff;
    border-radius: 0 10.2em 10.2em 0;
    top: -0.1em;
    left: 4.9em;
    transform-origin: 0.1em 5.1em;
    animation: load2 2s infinite ease;
  }

  @-webkit-keyframes load2 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes load2 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoaderBox = styled.div`
  position: relative;
`;

export const LoaderLogo = styled.img`
  position: absolute;
  width: 46px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 14;
`;
