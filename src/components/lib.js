/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

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
        position: relative;
        display: inline-block;
        margin: 1rem 0 0;
      `}
    >
      <label
        htmlFor={id}
        css={css`
          display: block;
          font-size: 0.75rem;
          line-height: 2;
          text-transform: capitalize;
        `}
      >
        {label.replace("_", " ")}
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
          outline: none;
        `}
      />
      <div
        css={css`
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          transform-origin: bottom center;
          background-color: currentColor;
          transform: scale(0);
          transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
          input:focus + & {
            transform: scale(1);
          }
        `}
      />
    </div>
  );
}

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 1em;
  font-size: 1rem;
  font-weight: 500;
  border: 0;
  border-radius: 0.25em;
  outline: none;
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover,
  &:focus {
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
  &:active {
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
`;

export { InputField, Button };
