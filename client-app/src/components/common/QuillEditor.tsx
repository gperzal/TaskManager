"use client";
import React from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useColorMode } from "@chakra-ui/react";
import "@css/globals.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
  const { colorMode } = useColorMode();

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "indent",
    "link",
  ];

  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules,
    formats,
    placeholder: "Escribe una descripción...",
  });

  React.useEffect(() => {
    if (quill) {
      if (quill.root.innerHTML !== value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }

      quill.on("text-change", () => {
        const newContent = quill.root.innerHTML;
        if (newContent !== value) {
          onChange(newContent);
        }
      });

      const editorContainer = quill.root.parentElement as HTMLElement;
      const toolbar = editorContainer.previousElementSibling as HTMLElement;

      if (colorMode === "dark") {
        editorContainer.style.backgroundColor = "#2d3748";
        editorContainer.style.color = "#E2E8F0";
        editorContainer.style.border = "1px solid #4A5568";
        toolbar.style.backgroundColor = "#2d3748";
        toolbar.style.border = "1px solid #4A5568";
        toolbar.querySelectorAll(".ql-stroke").forEach((icon) => {
          (icon as HTMLElement).style.stroke = "#ffffff";
        });
        toolbar.querySelectorAll(".ql-fill").forEach((icon) => {
          (icon as HTMLElement).style.fill = "#ffffff";
        });
        toolbar
          .querySelectorAll(".ql-picker-label, .ql-picker-item")
          .forEach((item) => {
            (item as HTMLElement).style.color = "#ffffff";
          });
      } else {
        editorContainer.style.backgroundColor = "#FFFFFF";
        editorContainer.style.color = "#1A202C";
        editorContainer.style.border = "1px solid #CBD5E0";
        toolbar.style.backgroundColor = "#FFFFFF";
        toolbar.style.border = "1px solid #CBD5E0";
        toolbar.querySelectorAll(".ql-stroke").forEach((icon) => {
          (icon as HTMLElement).style.stroke = "#1A202C";
        });
        toolbar.querySelectorAll(".ql-fill").forEach((icon) => {
          (icon as HTMLElement).style.fill = "#1A202C";
        });
        toolbar
          .querySelectorAll(".ql-picker-label, .ql-picker-item")
          .forEach((item) => {
            (item as HTMLElement).style.color = "#1A202C";
          });
      }
    }
  }, [quill, colorMode, value, onChange]);

  return (
    <div style={{ width: "100%", minHeight: "150px" }}>
      <div ref={quillRef} style={{ width: "100%", minHeight: "250px" }} />
    </div>
  );
};
