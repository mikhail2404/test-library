import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";


const GoogleMap = ({ children, ...props }) => (
  <GoogleMapReact
    {...props}
    options={{
      fullscreenControl: false
    }}>
    {children}
  </GoogleMapReact>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

GoogleMap.defaultProps = {
  children: null
};

export default GoogleMap;
