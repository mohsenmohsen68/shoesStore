"use client";
import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import './ArticleEditor.css'
import MathType from '@wiris/mathtype-ckeditor5/dist/index.js';

import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  BlockToolbar,
  Bold,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  HeadingButtonsUI,
  ParagraphButtonUI,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageInline,
	ImageCaption,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  List,
  ListProperties,
  Paragraph,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  Title,
  Underline,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

export default function ArticleEditor({onHandleAddArticle, imgPath, initData}) {
  
  const [data, setData] = useState("");
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  const handleChange = () => {
    onHandleAddArticle(data);
  };

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("uploadImg", file);
            fetch(imgPath, {
              method: "POST",
              body: body
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ default: res.url });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const editorConfig = {
    // config.contentsLangDirection = 'rtl',
    extraPlugins: [uploadPlugin],
    
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "sourceEditing",
        "showBlocks",
        "findAndReplace",
        "selectAll",
        "|",
        "paragraph",
        "heading1",
        "heading2",
        "heading3",
        "heading4",
        "heading5",
        "heading6",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "subscript",
        "superscript",
        "code",
        "removeFormat",
        "|",
        "specialCharacters",
        "horizontalLine",
        "link",
        "insertImageViaUrl",
        "insertTable",
        "highlight",
        "blockQuote",
        "codeBlock",
        "htmlEmbed",
        "|",
        "alignment",
        "direction:ltr",
        "direction:rtl",
        "|",
        "bulletedList",
        "numberedList",
        "outdent",
        "indent",
        "|",
        "accessibilityHelp",
        "|",
        "MathType",
        "ChemType"
        //"insertImage"
      ],
      shouldNotGroupWhenFull: true
    },
    plugins: [
      MathType,
      // 
      AccessibilityHelp,
      Alignment,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      BlockToolbar,
      Bold,
      CloudServices,
      Code,
      CodeBlock,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      FullPage,
      GeneralHtmlSupport,
      Heading,
      HeadingButtonsUI,
      ParagraphButtonUI,
      Highlight,
      HorizontalLine,
      HtmlComment,
      HtmlEmbed,
      ImageBlock,
	    ImageCaption,
	    ImageInsertViaUrl,
      ImageInline,
	    ImageResize,
	    ImageStyle,
	    ImageTextAlternative,
	    ImageToolbar,
	    ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      List,
      ListProperties,
      Paragraph,
      RemoveFormat,
      SelectAll,
      ShowBlocks,
      SourceEditing,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Style,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      Title,
      Underline,
      Undo,
    ],
    alignment: {
      options: ["left", "right", "center", "justify"]
    },
    balloonToolbar: [
      "bold",
      "italic",
      "|",
      "link",
      "|",
      "bulletedList",
      "numberedList"
    ],
    blockToolbar: [
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "bold",
      "italic",
      "|",
      "link",
      "insertTable",
      "|",
      "outdent",
      "indent"
    ],
    fontFamily: {
      supportAllValues: true
    },
    fontSize: {
      options: [10, 12, 14, "default", 18, 20, 22],
      supportAllValues: true
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph"
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1"
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2"
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3"
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4"
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5"
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6"
        }
       
      ]
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true
        }
      ]
    },
    image: {
      toolbar: [
        "imageStyle:block",
        "|",
         "imageStyle:alignLeft",
         "imageStyle:alignRight",
         "|",
         "imageStyle:alignCenter",
         "imageStyle:alignBlockLeft",
         "imageStyle:alignBlockRight",
        "|",
        "toggleImageCaption",
        "imageTextAlternative",
        
      ],
      insert: {
        // If this setting is omitted, the editor defaults to 'block'.
        // See explanation below.
        type: "auto"
      }
    },
    initialData: initData,

    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file"
          }
        }
      }
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true
      }
    },
    menuBar: {
      isVisible: true
    },
    style: {
      definitions: [
        {
          name: "Article category",
          element: "h3",
          classes: ["category"]
        },
        {
          name: "Title",
          element: "h2",
          classes: ["document-title"]
        },
        {
          name: "Subtitle",
          element: "h3",
          classes: ["document-subtitle"]
        },
        {
          name: "Info box",
          element: "p",
          classes: ["info-box"]
        },
        {
          name: "Side quote",
          element: "blockquote",
          classes: ["side-quote"]
        },
        {
          name: "Marker",
          element: "span",
          classes: ["marker"]
        },
        {
          name: "Spoiler",
          element: "span",
          classes: ["spoiler"]
        },
        {
          name: "Code (dark)",
          element: "pre",
          classes: ["fancy-code", "fancy-code-dark"]
        },
        {
          name: "Code (bright)",
          element: "pre",
          classes: ["fancy-code", "fancy-code-bright"]
        }
      ]
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties"
      ]
    },
    autoParagraph: false,
    enterMode: "div",
    ShiftEnterMode: "br",
    language: {
      ui: 'en',
      content: 'fa'
    }
  };

  return (
    <div>
      <div className='pt-4'>
        <div ref={editorContainerRef}>
          <div>
            <div ref={editorRef}>
              {isLayoutReady && (
                <CKEditor className="p-9"
                  editor={ClassicEditor}
                  config={editorConfig}
                  onChange={(event, ClassicEditor) => {
                    setData(ClassicEditor.getData());
                    handleChange();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
