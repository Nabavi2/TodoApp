import React from 'react';
import {Svg, Path} from 'react-native-svg';

const BackArrow = () => {
  return (
    <Svg
      width="8"
      height="15"
      viewBox="0 0 8 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M7 14L1.4882 8.64899C0.837267 8.01705 0.837267 6.98295 1.4882 6.35101L7 1"
        stroke="#3D3D3D"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default BackArrow;
