import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

const Flex = styled.div`
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Container = styled.div`
  padding: 15px 10px;
  flex: 1;
  background: #eaeaef10;
  color: #eaeaef90;
  border-radius: 5px;
  border: none;
  display: flex;
  font-size: 0.9rem;
  width: 100%;

  &:focus-within {
    background: #eaeaef20;
  }
`;

const Input = styled.input`
  padding: 0;
  background: none;
  border: none;
  font-size: inherit;
  color: inherit;
  flex: 1;

  &:active,
  &:focus {
    outline: none;
  }
`;

const DollarSign = styled.span`
  padding: 0 10px 0 5px;
  color: inherit;
  font-size: inherit;
`;

export default function Prompt({ onSubmit, disabled }) {
  const [command, setCommand] = useState("");

  useEffect(() => {
    if (!disabled) {
      document.querySelector("#prompt input").focus();
    }
  }, [disabled]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (command === "") {
          return;
        }

        if (!disabled) {
          onSubmit(command);
          setCommand("");
        }
      }}>
      <Flex>
        <Container id="prompt">
          <DollarSign>$</DollarSign>
          <Input
            disabled={disabled}
            type="text"
            name="prompt"
            value={command}
            autoComplete="off"
            placeholder={disabled ? "DISABLED" : "Press ENTER to run command"}
            onChange={(e) =>
              !disabled &&
              /^[ a-z0-9]*$/.test(e.target.value) &&
              setCommand(e.target.value)
            }
          />
        </Container>
      </Flex>
    </form>
  );
}
