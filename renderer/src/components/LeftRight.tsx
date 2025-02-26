import * as b from "bobril";

export function LeftRight(props: {
  left: b.IBobrilChildren;
  right: b.IBobrilChildren;
  expandRight?: boolean;
}) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: "5px",
        margin: "5px 0",
        justifyContent: "space-between",
      }}
    >
      <div>{props.left}</div>
      <div style={{ flex: props.expandRight ? 1 : undefined }}>
        {props.right}
      </div>
    </div>
  );
}
