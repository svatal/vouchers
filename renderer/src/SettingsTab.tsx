import * as b from "bobril";
import type { ISettings } from "../../main/sharedTypes";

export function SettingsTab() {
  const [settings, setSettings] = b.useState<ISettings>({
    templates: {},
    vouchers: {},
  });
  const [selectedVoucherId, setSelectedVoucherId] = b.useState<string | null>(
    null
  );
  const templatePreviewUrl = b.useState("");

  b.useEffect(() => {
    window.settings.get().then((settings) => {
      setSettings(settings);
      const firstVoucherId = Object.keys(settings.vouchers)[0];
      if (firstVoucherId) {
        setSelectedVoucherId(firstVoucherId);
      }
    });
  }, []);

  b.useEffect(() => {
    if (selectedVoucherId !== null) {
      const voucher = settings.vouchers[selectedVoucherId];
      if (voucher) {
        window.template
          .preview(voucher)
          .then((pdf) =>
            templatePreviewUrl(`${pdf}#toolbar=0&navpanes=0&view=Fit`)
          );
      }
    }
  }, [selectedVoucherId]);

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {Object.entries(settings.templates).map(([templateId, template]) => (
          <div key={templateId}>
            <h3>{template.filename}</h3>
            <ul>
              {Array.from({ length: template.pageCount }, (_, pageIndex) => (
                <li key={pageIndex}>
                  {pageIndex + 1}:
                  {Object.entries(settings.vouchers)
                    .filter(
                      ([_, voucher]) =>
                        voucher.templateId === templateId &&
                        voucher.page === pageIndex
                    )
                    .map(([voucherId, voucher]) => (
                      <span
                        key={voucherId}
                        style={{
                          cursor: "pointer",
                          textDecoration:
                            voucherId === selectedVoucherId
                              ? "underline"
                              : "none",
                        }}
                        onClick={() => setSelectedVoucherId(voucherId)}
                      >
                        Name: {voucher.name}
                      </span>
                    ))}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <iframe
          src={templatePreviewUrl()}
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}
