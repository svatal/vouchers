import * as b from "bobril";
import { TabButton } from "./TabButton";
import { VoucherTab } from "./VoucherTab";
import { SettingsTab } from "./SettingsTab";

b.init(() => <App />);

b.injectCss(`html, body { height: 100%; margin: 0; padding:0; }`);

function App() {
  const activeTab = b.useState("voucher");

  return (
    <div
      style={{
        height: "100%",
        boxSizing: "border-box",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      <div
        style={{ display: "flex", gap: "10px", borderBottom: "1px solid #ccc" }}
      >
        <TabButton
          label="Voucher"
          isActive={activeTab() === "voucher"}
          onClick={() => activeTab("voucher")}
        />
        <TabButton
          label="Settings"
          isActive={activeTab() === "settings"}
          onClick={() => activeTab("settings")}
        />
      </div>
      {activeTab() === "voucher" ? <VoucherTab /> : <SettingsTab />}
    </div>
  );
}
