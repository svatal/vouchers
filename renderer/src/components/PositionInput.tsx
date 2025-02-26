import * as b from "bobril";

interface PositionInputProps {
  x: b.IProp<number>;
  y: b.IProp<number>;
}

export const PositionInput = ({ x, y }: PositionInputProps) => (
  <>
    <label style={{ display: "inline-block" }}>
      X:
      <input
        type="number"
        value={x()}
        onChange={(v) => x(parseInt(v, 10))}
        style={{ width: 40 }}
      />
    </label>
    <label style={{ display: "inline-block" }}>
      Y:
      <input
        type="number"
        value={y()}
        onChange={(v) => y(parseInt(v, 10))}
        style={{ width: 40 }}
      />
    </label>
  </>
);
