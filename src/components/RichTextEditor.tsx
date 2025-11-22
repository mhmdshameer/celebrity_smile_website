import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { BubbleMenu as BubbleMenuExtension } from "@tiptap/extension-bubble-menu";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  Bold,
  Italic,
  Underline as UIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
} from "lucide-react";

import { useCallback, useEffect, useRef } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  isArabic?: boolean;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  isArabic = false,
  placeholder = "Write something...",
}: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "my-4 rounded-lg",
          style:
            "display: block; max-width: 100%; height: auto; margin: 0 auto;",
        },
      }),
      Youtube,
      BubbleMenuExtension,
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose max-w-none focus:outline-none ${
          isArabic ? "rtl text-right" : "ltr text-left"
        }`,
        placeholder,
      },
    },
  });

  const handleImageUpload = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        // TEMP: Replace with Cloudinary upload
        const url = URL.createObjectURL(file);

        editor?.chain().focus().setImage({ src: url }).run();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
    [editor]
  );

  const getYoutubeEmbedOrFallback = (url: string) => {
    let videoId = "";

    // Normal YouTube links
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    }
    // Shorts format
    else if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("/shorts/")[1].split("?")[0];
    }
    // youtu.be
    else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }

    if (!videoId) return null;

    // Regular embed URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return {
      embedUrl,
      fallbackHtml: `
        <div style="
          border: 1px solid #ddd; 
          padding: 12px; 
          border-radius: 8px;
          background: #fafafa;
        ">
          <strong>Video Preview</strong>
          <p>This video cannot be embedded.<br>Click below to watch on YouTube:</p>
          <a 
            href="${url}" 
            target="_blank" 
            rel="noopener noreferrer"
            style="
              color: #1a73e8; 
              font-weight: bold; 
              text-decoration: underline;
            "
          >
            Open YouTube Video
          </a>
        </div>
      `
    };
  };

  const addYoutubeVideo = useCallback(() => {
    const url = window.prompt("Enter YouTube URL");

    if (!url) return;

    const result = getYoutubeEmbedOrFallback(url);

    if (!result) {
      alert("Invalid YouTube URL. Please provide a valid YouTube video link.");
      return;
    }

    const { embedUrl, fallbackHtml } = result;

    try {
      // Try embedding first
      editor?.commands.setYoutubeVideo({
        src: embedUrl,
        width: 640,
        height: 360,
      });
    } catch (e) {
      console.error("Failed to embed YouTube video:", e);
      // If embed fails → fallback preview
      editor?.commands.insertContent(fallbackHtml);
    }
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.commands.focus();
    }
  }, [editor]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const handleEditorClick = () => {
    editor.commands.focus();
  };

  return (
    <Card className="overflow-hidden">
      <div className="border-b p-2 bg-muted/20">
        <ToggleGroup type="multiple" className="flex flex-wrap gap-1">
          {/* Bold */}
          <ToggleGroupItem
            value="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-muted" : ""}
          >
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>

          {/* Italic */}
          <ToggleGroupItem
            value="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-muted" : ""}
          >
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>

          {/* Underline */}
          <ToggleGroupItem
            value="underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "bg-muted" : ""}
          >
            <UIcon className="h-4 w-4" />
          </ToggleGroupItem>

          {/* Headings */}
          <ToggleGroupItem
            value="h1"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""}
          >
            <Heading1 className="h-4 w-4" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="h2"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
          >
            <Heading2 className="h-4 w-4" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="h3"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive("heading", { level: 3 }) ? "bg-muted" : ""}
          >
            <Heading3 className="h-4 w-4" />
          </ToggleGroupItem>

          {/* Lists */}
          <ToggleGroupItem
            value="bullet"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-muted" : ""}
          >
            <List className="h-4 w-4" />
          </ToggleGroupItem>

          <ToggleGroupItem
            value="ordered"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-muted" : ""}
          >
            <ListOrdered className="h-4 w-4" />
          </ToggleGroupItem>

          {/* Alignment */}
          <ToggleGroupItem
            value="align-left"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={editor.isActive({ textAlign: "left" }) ? "bg-muted" : ""}
          >
            L
          </ToggleGroupItem>

          <ToggleGroupItem
            value="align-center"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={editor.isActive({ textAlign: "center" }) ? "bg-muted" : ""}
          >
            C
          </ToggleGroupItem>

          <ToggleGroupItem
            value="align-right"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={editor.isActive({ textAlign: "right" }) ? "bg-muted" : ""}
          >
            R
          </ToggleGroupItem>

          <ToggleGroupItem
            value="align-justify"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={editor.isActive({ textAlign: "justify" }) ? "bg-muted" : ""}
          >
            J
          </ToggleGroupItem>

          <div className="h-6 w-px bg-border mx-1"></div>

          {/* Image Upload */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleImageUpload}
          >
            <ImageIcon className="h-4 w-4" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </Button>

          {/* YouTube */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={addYoutubeVideo}
          >
            <YoutubeIcon className="h-4 w-4" />
          </Button>
        </ToggleGroup>
      </div>

      <div
        className="p-4"
        onClick={handleEditorClick}
        style={{ cursor: "text" }}
      >
        {editor && (
          <BubbleMenu
            editor={editor}
            shouldShow={({ state }) => !state.selection.empty}
          >
            <div className="flex gap-1 p-1 bg-white rounded-md shadow-lg border border-gray-200">
              <button
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                  editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""
                }`}
              >
                L
              </button>

              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={`p-2 rounded hover:bg-gray-100 ${
                  editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
                }`}
              >
                C
              </button>

              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={`p-2 rounded hover:bg-gray-100 ${
                  editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
                }`}
              >
                R
              </button>

              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
                className={`p-2 rounded hover:bg-gray-100 ${
                  editor.isActive({ textAlign: "justify" }) ? "bg-gray-200" : ""
                }`}
              >
                J
              </button>
            </div>
          </BubbleMenu>
        )}

        <EditorContent
          editor={editor}
          className={`min-h-[200px] ${isArabic ? "rtl" : "ltr"}`}
        />
      </div>
    </Card>
  );
}
