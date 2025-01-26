import * as b from "bobril";

interface Voucher {
  id: string;
  name: string;
}

export function VoucherTab() {
  const voucherId = b.useState("300");
  const code = b.useState(() => generateCode());
  const expiration = b.useState(() => generateExpiration());
  const pdfUrl = b.useState("");
  const vouchers = b.useState<Voucher[]>([]);

  b.useEffect(() => {
    window.settings.get().then((settings) => {
      vouchers(settings.vouchers);
    });
  }, []);

  b.useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.voucher
        .preview(voucherId(), getVoucherParams(code(), expiration()))
        .then((pdf) => pdfUrl(`${pdf}#toolbar=0&navpanes=0&view=Fit`));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [voucherId(), code(), expiration()]);

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
          Value:&nbsp;
          <select value={voucherId}>
            {vouchers().map((voucher) => (
              <option key={voucher.id} value={voucher.id}>
                {voucher.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Code:&nbsp;
          <input type="text" value={code} />
          &nbsp;
          <input
            type="button"
            onClick={() => code[1](generateCode())}
            value="Regenerate"
          />
        </div>
        <div>
          Expiration:&nbsp;
          <input type="text" value={expiration} />
          &nbsp;
          <input
            type="button"
            onClick={() => expiration[1](generateExpiration())}
            value="Reset to +6months"
          />
        </div>
        <div>
          <input
            type="button"
            onClick={() => {
              window.voucher.create(
                voucherId(),
                getVoucherParams(code(), expiration())
              );
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

function getVoucherParams(code: string, validUntil: string) {
  return { code, validUntil };
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
