import React from 'react';
import {Svg, Circle} from 'react-native-svg';

interface Props {
  color?: string;
}

const More = ({color = '#fff'}: Props) => {
  return (
    <Svg
      width="16"
      height="4"
      viewBox="0 0 16 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx="1.84615" cy="1.84615" r="1.84615" fill={color} />
      <Circle cx="8.00002" cy="1.84615" r="1.84615" fill={color} />
      <Circle cx="14.1538" cy="1.84615" r="1.84615" fill={color} />
    </Svg>
  );
};

export default More;
