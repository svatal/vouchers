import * as b from "bobril";

interface ISplitPaneProps {
  split: "vertical" | "horizontal";
  minSize: number;
  defaultSize: string | number;
  children: b.IBobrilChildren;
}

export function SplitPane(props: ISplitPaneProps) {
  const isVertical = props.split === "vertical";
  const [size, setSize] = b.useState(props.defaultSize);
  const leftPane = b.useRef<b.IBobrilCacheNode>();
  const isResizing = b.useState(false);

  const handleMouseDown = (e: b.IBobrilMouseEvent) => {
    isResizing(true);
    const leftPaneBB = (
      b.getDomNode(leftPane.current) as HTMLElement
    ).getBoundingClientRect();
    const startSize = isVertical ? leftPaneBB.width : leftPaneBB.height;
    const startPos = isVertical ? e.x : e.y;
    const onMouseMove = (e: MouseEvent) => {
      const newSize =
        startSize + (isVertical ? e.clientX : e.clientY) - startPos;
      setSize(Math.max(props.minSize, newSize));
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      isResizing(false);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isVertical ? "row" : "column",
        height: "100%",
      }}
    >
      <div
        ref={leftPane}
        style={{
          flex: `0 0 ${b.isNumber(size) ? `${size}px` : size}`,
          pointerEvents: isResizing() ? "none" : "auto",
          userSelect: isResizing() ? "none" : "auto",
        }}
      >
        {b.isArray(props.children) ? props.children[0] : props.children}
      </div>
      <div
        style={{
          flex: "0 0 5px",
          cursor: isVertical ? "col-resize" : "row-resize",
          background: "#ccc",
        }}
        onMouseDown={handleMouseDown}
      />
      <div
        style={{
          flex: 1,
          pointerEvents: isResizing() ? "none" : "auto",
          userSelect: isResizing() ? "none" : "auto",
        }}
      >
        {b.isArray(props.children) ? props.children[1] : null}
      </div>
    </div>
  );
}
