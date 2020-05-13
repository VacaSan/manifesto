/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { InputField } from "./components/lib";

/**
 * @param {object} s
 * @param {object} a
 */
const merge = (s, a) => ({ ...s, ...a });

function App() {
  const [state, dispatch] = React.useReducer(merge, {
    short_name: "manifesto",
    name: "manifesto web app manifest generator",
    start_url: ".",
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
  });

  const onChange = React.useCallback(
    evt => {
      const { name, value } = evt.target;
      dispatch({ [name]: value });
    },
    [dispatch]
  );

  const zipRef = React.useRef(new JSZip());

  return (
    <React.Fragment>
      <header
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 48px;
          padding: 0 1rem;
          background-color: #fff;
          box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
            0px 4px 5px 0px rgba(0, 0, 0, 0.14),
            0px 1px 10px 0px rgba(0, 0, 0, 0.12);
        `}
      >
        <div
          css={css`
            color: rgba(0, 0, 0, 0.65);
            font-size: 1.25rem;
            line-height: 1.6;
          `}
        >
          Manifesto
        </div>
      </header>
      <main
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: calc(100vh - 48px);
          margin-top: 48px;
        `}
      >
        <section
          css={css`
            padding: 1rem;
          `}
        >
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-column-gap: 1rem;
            `}
          >
            {Object.entries(state).map(([name, value]) => {
              return (
                <InputField
                  key={name}
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              );
            })}
            <div>
              <input
                type="file"
                accept="image/png"
                onChange={evt => {
                  if (evt.target.files && evt.target.files[0]) {
                    zipRef.current.folder("icons");
                    const img = new Image();
                    img.src = URL.createObjectURL(evt.target.files[0]);
                    img.onload = () => {
                      const canvas = document.createElement("canvas");
                      // iterate over different sizes, 76, 92, 128...
                      canvas.width = 512;
                      canvas.height = 512;
                      const { naturalWidth, naturalHeight } = img;
                      const ctx = canvas.getContext("2d");

                      const max = Math.min(naturalWidth, naturalHeight);
                      const sX = (naturalWidth - max) / 2;
                      const sY = (naturalHeight - max) / 2;
                      ctx.drawImage(
                        img,
                        sX,
                        sY,
                        naturalWidth,
                        naturalHeight,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                      );

                      canvas.toBlob(blob => {
                        zipRef.current
                          .file("icons/icon.png", blob)
                          .generateAsync({ type: "blob" })
                          .then(blob => {
                            saveAs(blob, "manifest.zip");
                          });
                      });
                    };
                  }
                }}
              />
            </div>
          </div>
        </section>
        <section
          css={css`
            background-color: #283142;
            color: #eceff1;
            padding: 1rem;
            font-size: 1rem;
            line-height: 1.5em;
          `}
        >
          <pre css={{ margin: 0 }}>{JSON.stringify(state, null, 2)}</pre>
        </section>
      </main>
    </React.Fragment>
  );
}

export default App;
