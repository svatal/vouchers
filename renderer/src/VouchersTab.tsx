import * as b from "bobril";
import { ISettings } from "../../main/sharedTypes";

export function VouchersTab() {
  const [settings, setSettings] = b.useState<ISettings>({
    vouchers: {},
    templates: {},
    templateFiles: {},
  });
  b.useEffect(() => {
    window.settings.get().then(setSettings);
  }, []);
  const codeFilter = b.useState("");
  const entries = b.useMemo(() => {
    const lcCodeFilter = codeFilter().toLocaleLowerCase();
    return Object.entries(settings.vouchers)
      .filter(([_, voucher]) =>
        voucher.code.toLocaleLowerCase().includes(lcCodeFilter)
      )
      .sort(([_keyA, a], [_keyB, b]) => b.createdAtTicks - a.createdAtTicks);
  }, [settings, codeFilter()]);
  return (
    <>
      <div>
        Code: <input type="text" value={codeFilter} />
      </div>
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
          {entries.map(([id, voucher]) => (
            <tr
              key={id}
              style={{ color: voucher.isRedeemed ? "lightgray" : "black" }}
            >
              <td>{voucher.code}</td>
              <td>{voucher.validUntil}</td>
              <td>{settings.templates[voucher.templateId]?.name}</td>
              <td>{voucher.note}</td>
              <td>
                {voucher.isRedeemed ? "Yes" : "No"}{" "}
                {
                  <input
                    type="button"
                    value={voucher.isRedeemed ? "Revalidate" : "Redeem"}
                    onClick={() => {
                      window.voucher
                        .redeem(id, !voucher.isRedeemed)
                        .then(() => window.settings.get())
                        .then(setSettings);
                    }}
                  />
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
