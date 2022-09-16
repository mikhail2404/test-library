import {
  Loader,
  LoaderBox,
  LoaderLogo,
  LoaderMessage,
  LoaderWrapper,
  Overlay
} from "./styled";

const LoadingSpinner = (props) => {
  return (
    <Overlay {...props}>
      <LoaderWrapper orderItemLoader={props.orderItemLoader}>
        <LoaderBox>
          <Loader></Loader>
          <LoaderLogo src="/themes/react-app/src/assets/loader-logo.png" />
        </LoaderBox>
      </LoaderWrapper>

      {props.message && (
        <LoaderMessage {...props}>{props.message}</LoaderMessage>
      )}
    </Overlay>
  );
};

export default LoadingSpinner;
