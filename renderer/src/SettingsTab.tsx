import * as b from "bobril";
import { SplitPane } from "./components/SplitPane";
import type { ISettings } from "../../main/sharedTypes";

export function SettingsTab() {
  const [settings, setSettings] = b.useState<ISettings>({
    templateFiles: {},
    templates: {},
  });
  const [selectedTemplateId, setSelectedTemplateId] = b.useState<string | null>(
    null
  );
  const templatePreviewUrl = b.useState("");

  b.useEffect(() => {
    window.settings.get().then((settings) => {
      setSettings(settings);
      const firstTemplateId = Object.keys(settings.templates)[0];
      if (firstTemplateId) {
        setSelectedTemplateId(firstTemplateId);
      }
    });
  }, []);

  b.useEffect(() => {
    if (selectedTemplateId !== null) {
      const template = settings.templates[selectedTemplateId];
      if (template) {
        window.template
          .preview(template)
          .then((pdf) =>
            templatePreviewUrl(`${pdf}#toolbar=0&navpanes=0&view=Fit`)
          );
      }
    }
  }, [selectedTemplateId]);

  return (
    <SplitPane split="vertical" minSize={200} defaultSize="50%">
      <div style={{ overflowY: "auto" }}>
        {Object.entries(settings.templateFiles).map(
          ([templateFileId, templateFile]) => (
            <div key={templateFileId}>
              <h3>{templateFile.filename}</h3>
              <ul>
                {Array.from(
                  { length: templateFile.pageCount },
                  (_, pageIndex) => (
                    <li key={pageIndex}>
                      {pageIndex + 1}:
                      {Object.entries(settings.templates)
                        .filter(
                          ([_, template]) =>
                            template.templateFileId === templateFileId &&
                            template.page === pageIndex
                        )
                        .map(([templateId, template]) => (
                          <span
                            key={templateId}
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                templateId === selectedTemplateId
                                  ? "underline"
                                  : "none",
                            }}
                            onClick={() => setSelectedTemplateId(templateId)}
                          >
                            Name: {template.name}
                          </span>
                        ))}
                    </li>
                  )
                )}
              </ul>
            </div>
          )
        )}
      </div>
      <div style={{ height: "100%" }}>
        <iframe
          src={templatePreviewUrl()}
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </SplitPane>
  );
}
