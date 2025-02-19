import * as b from "bobril";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        border: "1px solid #ccc",
        borderBottomColor: isActive ? "white" : "#ccc",
        marginBottom: "-1px",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        background: "none",
        cursor: "pointer",
        outline: "none",
        fontWeight: isActive ? "bold" : "normal",
        color: isActive ? "#0078d4" : "#000",
      }}
    >
      {label}
    </button>
  );
}
