import * as b from "bobril";
import type { ISettings } from "../../main/sharedTypes";

export function SettingsTab() {
  const [settings, setSettings] = b.useState<ISettings>({
    templates: {},
    vouchers: {},
  });

  b.useEffect(() => {
    window.settings.get().then((settings) => {
      setSettings(settings);
    });
  }, []);

  return (
    <div>
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
                    <span key={voucherId}> Name: {voucher.name}</span>
                  ))}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
