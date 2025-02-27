import * as b from "bobril";
import { TabButton } from "./components/TabButton";
import { CreateVoucherTab } from "./CreateVoucherTab";
import { VouchersTab } from "./VouchersTab";
import { SettingsTab } from "./SettingsTab";

enum Tab {
  CreateVoucher,
  Vouchers,
  Settings,
}

b.init(() => <App />);

b.injectCss(`html, body { height: 100%; margin: 0; padding:0; }`);

function App() {
  const activeTab = b.useState(Tab.CreateVoucher);

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
          label="Create Voucher"
          isActive={activeTab() === Tab.CreateVoucher}
          onClick={() => activeTab(Tab.CreateVoucher)}
        />
        <TabButton
          label="Issued Vouchers"
          isActive={activeTab() === Tab.Vouchers}
          onClick={() => activeTab(Tab.Vouchers)}
        />
        <TabButton
          label="Settings"
          isActive={activeTab() === Tab.Settings}
          onClick={() => activeTab(Tab.Settings)}
        />
      </div>
      {activeTab() === Tab.CreateVoucher ? (
        <CreateVoucherTab />
      ) : activeTab() === Tab.Settings ? (
        <SettingsTab />
      ) : (
        <VouchersTab />
      )}
    </div>
  );
}
