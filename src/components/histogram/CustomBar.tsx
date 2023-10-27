import { Rectangle } from "recharts";

type CustomBarShapeProps = {
  x?: number,
  y?: number,
  width?: number,
  height?: number
}

const CustomBarShape = (props: CustomBarShapeProps) => {
  const { x, y, width, height } = props;

  return (
    <Rectangle
      {...props}
      className="hoverable-bar"
      x={x}
      y={y}
      width={width}
      height={height}
    />
  );
};

export default CustomBarShape;