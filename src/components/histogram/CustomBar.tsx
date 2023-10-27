import { Rectangle } from "recharts";

const CustomBarShape = (props) => {
  const { fill, x, y, width, height } = props;

  return (
    <Rectangle
      {...props}
      className="hoverable-bar"
      fill={fill}
      x={x}
      y={y}
      width={width}
      height={height}
    />
  );
};

export default CustomBarShape;