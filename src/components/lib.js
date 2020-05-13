/** @jsx jsx */
import { jsx, css } from "@emotion/core";

/**
 * @param {object} props
 * @param {string} props.name
 * @param {string | number} props.value
 * @param {(evt: React.ChangeEvent<HTMLInputElement>) => any} props.onChange
 * @param {string} [props.id]
 * @param {string} [props.label]
 * @param {"text" | "number"} [props.type="text"]
 */
function InputField({
  name,
  value,
  onChange,
  id = name,
  label = name,
  type = "text",
}) {
  return (
    <div
      key={id}
      css={css`
        display: inline-block;
        margin: 1rem 0 0;
      `}
    >
      <label
        htmlFor={id}
        css={css`
          display: block;
          font-size: 0.75rem;
          line-height: 1.5;
        `}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
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
}

export { InputField };
