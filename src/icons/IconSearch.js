const IconSearch = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20">
    <g fill="none" fillRule="evenodd">
      <path
        d="M0 0H20V20H0z"
        transform="translate(-45 -151) translate(45 151)"
      />
      <g fill={style.color}>
        <path
          // eslint-disable-next-line max-len
          d="M6.875 0c3.797 0 6.875 3.078 6.875 6.875 0 1.7-.617 3.256-1.64 4.456l2.265 2.389c.293.293.293.767 0 1.06-.27.27-.696.291-.99.063l-.071-.063-2.294-2.42c-1.153.873-2.588 1.39-4.145 1.39C3.078 13.75 0 10.672 0 6.875S3.078 0 6.875 0zm0 1.25c-3.107 0-5.625 2.518-5.625 5.625S3.768 12.5 6.875 12.5 12.5 9.982 12.5 6.875 9.982 1.25 6.875 1.25z"
          transform="translate(-45 -151) translate(45 151) translate(2.5 2.5)"
        />
      </g>
    </g>
  </svg>
);

export default IconSearch;
