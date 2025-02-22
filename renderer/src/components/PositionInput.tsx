import * as b from "bobril";

interface PositionInputProps {
  label: string;
  x: b.IProp<number>;
  y: b.IProp<number>;
}

export const PositionInput = ({ label, x, y }: PositionInputProps) => (
  <div>
    <label>
      {label} Position X:
      <input
        type="number"
        value={x()}
        onChange={(v) => x(parseInt(v, 10))}
        style={{ width: 40 }}
      />
    </label>
    <label>
      Y:
      <input
        type="number"
        value={y()}
        onChange={(v) => y(parseInt(v, 10))}
        style={{ width: 40 }}
      />
    </label>
  </div>
);
