import * as b from "bobril";
import { ISettings, IVoucher } from "../../main/sharedTypes";

export function VouchersTab() {
  const [settings, setSettings] = b.useState<ISettings>({
    vouchers: {},
    templates: {},
    templateFiles: {},
  });
  b.useEffect(() => {
    window.settings.get().then(setSettings);
  }, []);
  return (
    <table>
      <thead>
        <tr style={{ textAlign: "left" }}>
          <th>Code</th>
          <th>Valid until</th>
          <th>Template</th>
          <th>Note</th>
          <th>Redeemed</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(settings.vouchers)
          .sort((a, b) => b[1].createdAtTicks - a[1].createdAtTicks)
          .map(([id, voucher]) => (
            <tr key={id}>
              <td>{voucher.code}</td>
              <td>{voucher.validUntil}</td>
              <td>{settings.templates[voucher.templateId]?.name}</td>
              <td>{voucher.note}</td>
              <td>{voucher.isRedeemed ? "Yes" : "No"}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
