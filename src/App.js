/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";

function App() {
  const [state, setState] = React.useState({
    short_name: "manifesto",
    name: "manifesto web app manifest generator",
    start_url: ".",
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
  });

  const onChange = React.useCallback(evt => {
    const { name, value } = evt.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

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
                <div
                  key={name}
                  css={css`
                    display: inline-block;
                    margin: 1rem 0 0;
                  `}
                >
                  <label
                    htmlFor={name}
                    css={css`
                      display: block;
                      font-size: 0.75rem;
                      line-height: 1.5;
                    `}
                  >
                    {name}
                  </label>
                  <input
                    type="text"
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    css={css`
                      width: 100%;
                      padding: 0 0.5em;
                      font-size: 1rem;
                      line-height: 2.5;
                      border: 0;
                      border-bottom: 1px solid currentColor;
                      border-radius: 0;
                      border-top-left-radius: 0.25em;
                      border-top-right-radius: 0.25em;
                    `}
                  />
                </div>
              );
            })}
          </div>
        </section>
        <section
          css={css`
            background-color: #283142;
            color: #eceff1;
            padding: 1rem;
            font-size: 1rem;
            line-height: 1.2em;
          `}
        >
          <pre css={{ margin: 0 }}>{JSON.stringify(state, null, 2)}</pre>
        </section>
      </main>
    </React.Fragment>
  );
}

export default App;
