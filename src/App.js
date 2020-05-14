/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button, InputField } from "./components/lib";

/**
 * @param {object} s
 * @param {object} a
 */
const merge = (s, a) => ({ ...s, ...a });

/**
 * @param {string} key
 * @param {any} value
 */
const replacer = (key, value) =>
  key === "blob" || value === "" ? undefined : value;

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

  async function onDownload() {
    const zip = new JSZip();

    zip.file("manifest.json", JSON.stringify(state, replacer, 2));
    zip.folder("icons");

    (state.icons || []).forEach(icon => {
      zip.file(icon.src, icon.blob);
    });

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "manifesto.zip");
  }

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
            font-weight: 500;
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
              margin-bottom: 1rem;
            `}
          >
            {Object.entries(state).map(([name, value]) => {
              // is there a nicer way?
              if (name === "icons") return null;

              return (
                <InputField
                  key={name}
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              );
            })}
          </div>
          <div>
            <input
              type="file"
              accept="image/png"
              onChange={evt => {
                if (evt.target.files && evt.target.files[0]) {
                  generateIcons(evt.target.files[0]).then(icons =>
                    dispatch({ icons })
                  );
                }
              }}
            />
          </div>
          <div>
            <Button type="button" onClick={onDownload}>
              Download!
            </Button>
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
          <pre css={{ margin: 0 }}>{JSON.stringify(state, replacer, 2)}</pre>
        </section>
      </main>
    </React.Fragment>
  );
}

/**
 * @param {File} file
 * @returns {Promise<HTMLImageElement>}
 */
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

/**
 * @param {HTMLImageElement} img
 * @param {number} [size=512]
 */
function cropAndResize(img, size = 512) {
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext("2d");

  const { naturalWidth: sw, naturalHeight: sh } = img;

  const minDimension = Math.min(sw, sh);
  const sx = (sw - minDimension) / 2;
  const sy = (sh - minDimension) / 2;

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

  return canvas.convertToBlob();
}

/**
 * @param {File} file
 */
async function generateIcons(file) {
  const img = await loadImage(file);

  // TODO rest of required sizes...
  const sizes = [16, 32, 64];

  return await Promise.all(
    sizes.map(async size => {
      const blob = await cropAndResize(img, size);
      return {
        src: `icons/icon-${size}x${size}.png`,
        type: "image/png",
        sizes: `${size}x${size}`,
        blob,
      };
    })
  );
}

export default App;
