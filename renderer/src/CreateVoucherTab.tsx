import * as b from "bobril";
import { debounce } from "./utils";

interface Template {
  name: string;
}

export function CreateVoucherTab() {
  const [templateId, setTemplateId] = b.useState<string | null>(null);
  const code = b.useState(() => generateCode());
  const expiration = b.useState(() => generateExpiration());
  const note = b.useState("");
  const pdfUrl = b.useState("");
  const templates = b.useState<{ [id: string]: Template }>({});

  b.useEffect(() => {
    window.settings.get().then((settings) => {
      templates(settings.templates);
      const firstTemplateId = Object.keys(settings.templates)[0];
      if (firstTemplateId) {
        setTemplateId(firstTemplateId);
      }
    });
  }, []);

  b.useEffect(() => {
    if (templateId !== null) {
      return debounce(() => {
        window.voucher
          .preview(templateId, { code: code(), validUntil: expiration() })
          .then((pdf) => pdfUrl(`${pdf}#toolbar=0&navpanes=0&view=Fit`));
      }, 500);
    }
  }, [templateId, code(), expiration()]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "5px",
          justifyContent: "space-between",
        }}
      >
        <div>
          Template:&nbsp;
          <select
            value={templateId}
            onChange={(newValue: string) => setTemplateId(newValue)}
          >
            {Object.entries(templates()).map(([id, template]) => (
              <option key={id} value={id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Code:&nbsp;
          <input type="text" value={code} style={{ width: "70px" }} />
          &nbsp;
          <input
            type="button"
            onClick={() => code[1](generateCode())}
            value="Regenerate"
          />
        </div>
        <div>
          Expiration:&nbsp;
          <input type="text" value={expiration} style={{ width: "70px" }} />
          &nbsp;
          <input
            type="button"
            onClick={() => expiration[1](generateExpiration())}
            value="Reset to +6months"
          />
        </div>
        <div>
          Note:&nbsp;
          <input type="text" value={note} />
        </div>
        <div>
          <input
            type="button"
            onClick={() => {
              if (templateId !== null)
                window.voucher.create({
                  templateId,
                  code: code(),
                  validUntil: expiration(),
                  note: note(),
                });
            }}
            value="Create Voucher"
          />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <iframe
          src={pdfUrl()}
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </>
  );
}

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function generateExpiration() {
  const expiration = new Date();
  expiration.setMonth(expiration.getMonth() + 6);
  return `${expiration.getDate()}.${
    expiration.getMonth() + 1
  }.${expiration.getFullYear()}`;
}
