import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useToast } from "@/hooks/use-toast";
import { Brain, Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { aiResult } from "../../../../service/AIModel";

interface RichTextEditorProps {
  onRichTextEditorChange: (args0: string) => void;
  index: number;
  defaultValue: string;
}

const RichTextEditor = ({
  onRichTextEditorChange,
  index,
  defaultValue,
}: RichTextEditorProps) => {
  const resumeContext = useContext(ResumeInfoContext);

  if (!resumeContext) {
    throw new Error("ResumeInfoContext is not provided");
  }

  const { resumeInfo } = resumeContext;

  const [value, setValue] = useState("");

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const generateFromAI = async () => {
    if (resumeInfo?.experience[index]?.title) {
      setLoading(true);
      const propmt = `Generate a summary for work experience section of resume for job title ${resumeInfo?.experience[index]?.title} in 3 to 4 points. (Note: The response should be such that it can be used directly as value of summary section without needing to parse it. Meaning it should be just 3 to 4 points and nothing else.)`;
      const result = await aiResult(propmt);
      const parsedResult = result.response.text().replace(/^[^\w]+/gm, "");
      setValue(parsedResult);
      onRichTextEditorChange(parsedResult);
      setLoading(false);
    } else {
      toast({ title: "Please Add Position Title" });
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex gap-2 border-primary text-primary"
          onClick={generateFromAI}
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e.target.value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
