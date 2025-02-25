import * as b from "bobril";
import { SplitPane } from "./components/SplitPane";
import { PositionInput } from "./components/PositionInput";
import type { ISettings } from "../../main/sharedTypes";
import { debounce } from "./utils";

export function SettingsTab() {
  const [settings, setSettings] = b.useState<ISettings>({
    templateFiles: {},
    templates: {},
  });
  const [selectedTemplateId, setSelectedTemplateId] = b.useState<string | null>(
    null
  );
  const templatePreviewUrl = b.useState("");
  const [lastUploadedId, setLastUploadedId] = b.useState<string | null>(null);
  const selectedTemplate = b.useMemo(
    () => settings.templates[selectedTemplateId ?? ""],
    [settings, selectedTemplateId]
  );
  const templateName = b.useState("");
  const templateCodeX = b.useState(0);
  const templateCodeY = b.useState(0);
  const templateValidUntilX = b.useState(0);
  const templateValidUntilY = b.useState(0);

  b.useEffect(() => {
    window.settings.get().then((settings) => {
      setSettings(settings);
      const templateId = lastUploadedId ?? Object.keys(settings.templates)[0];
      if (templateId) {
        selectTemplate(templateId);
      }
    });
  }, [lastUploadedId]);

  b.useEffect(() => {
    if (selectedTemplate)
      return debounce(() => {
        window.template
          .preview({
            ...selectedTemplate,
            codePosition: { x: templateCodeX(), y: templateCodeY() },
            validUntilPosition: {
              x: templateValidUntilX(),
              y: templateValidUntilY(),
            },
          })
          .then((pdf) =>
            templatePreviewUrl(`${pdf}#toolbar=0&navpanes=0&view=Fit`)
          );
      }, 1000);
  }, [
    selectedTemplate,
    templateCodeX(),
    templateCodeY(),
    templateValidUntilX(),
    templateValidUntilY(),
  ]);

  return (
    <SplitPane split="vertical" minSize={200} defaultSize="50%">
      <div style={{ overflowY: "auto" }}>
        <input
          type="button"
          value="Upload new template"
          onClick={() => {
            window.template.upload().then(setLastUploadedId);
          }}
        />
        {Object.entries(settings.templateFiles).map(
          ([templateFileId, templateFile]) => (
            <div key={templateFileId}>
              <h3>{templateFile.filename}</h3>
              <ul>
                {templateFile.templateIds.map((templateId) => {
                  const template = settings.templates[templateId];
                  return (
                    <li key={templateId}>
                      <span
                        style={{
                          cursor: "pointer",
                          textDecoration:
                            templateId === selectedTemplateId
                              ? "underline"
                              : "none",
                        }}
                        onClick={() => selectTemplate(templateId)}
                      >
                        Name: {template?.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )
        )}
      </div>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div>
          {selectedTemplate && (
            <>
              <div>
                <label>
                  Name:
                  <input type="text" value={templateName} />
                </label>
              </div>
              <PositionInput label="Code" x={templateCodeX} y={templateCodeY} />
              <PositionInput
                label="Valid Until"
                x={templateValidUntilX}
                y={templateValidUntilY}
              />
            </>
          )}
        </div>
        <iframe
          src={templatePreviewUrl()}
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </SplitPane>
  );

  function selectTemplate(templateId: string) {
    setSelectedTemplateId(templateId);
    const selectedTemplate = settings?.templates[templateId ?? ""];
    if (selectedTemplate) {
      templateName(selectedTemplate.name);
      templateCodeX(selectedTemplate.codePosition.x);
      templateCodeY(selectedTemplate.codePosition.y);
      templateValidUntilX(selectedTemplate.validUntilPosition.x);
      templateValidUntilY(selectedTemplate.validUntilPosition.y);
    }
  }
}
