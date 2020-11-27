import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import commands from "../lib/commands";
import { dateFmtRelative } from "../lib/date";
import Prompt from "../components/Prompt";
import ASCIILogo from "../components/ASCIILogo";
import Loading from "../components/Loading";
import { useGameState } from "../lib/use-game-state";
import { Width, Code, Spacing, Line, Emphasis } from "../components/helpers";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export default function Play() {
  const [stack, setStack] = useState([]);
  const [promptActive, setPromptActive] = useState(true);

  const pushToStack = (Component, command, argv) => {
    setStack((s) => [
      ...s,
      {
        // eslint-disable-next-line
        Component: () => {
          const [identifier, state] = useGameState(false);
          const [logged, setLogged] = useState(false);

          useEffect(() => {
            setPromptActive(!state.loading);
          }, [state]);

          useEffect(() => {
            if (!logged) {
              setLogged();
              fetch("/api/game/run", {
                method: "POST",
                body: JSON.stringify({
                  command: `${command} ${argv.join(" ")}`,
                }),
              });
            }
          }, []);

          return state.me.user ? (
            !state.me.user.dq ? (
              <Spacing style={{ paddingBottom: "0" }}>
                <Line style={{ fontSize: "0.9rem", color: "#eaeaef60" }}>
                  {dateFmtRelative(new Date(identifier))}
                </Line>
                <Line style={{ color: "#eaeaef90" }}>
                  $ {command} {argv.join(" ")}
                </Line>
                <Component
                  {...{
                    identifier,
                    gameState: state,
                    command,
                    argv,
                    doneLoading: () => setPromptActive(true),
                  }}
                />
              </Spacing>
            ) : (
              <Spacing style={{ paddingBottom: "0" }}>
                <Line style={{ fontSize: "0.9rem", color: "#eaeaef60" }}>
                  {dateFmtRelative(new Date(identifier))}
                </Line>
                <Line style={{ color: "#eaeaef90" }}>
                  $ {command} {argv.join(" ")}
                </Line>
                <Line>
                  You have been disqualified. Please contact an admin if you
                  think this is a mistake.
                </Line>
              </Spacing>
            )
          ) : (
            <Loading />
          );
        },
      },
    ]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    const bottom = document.querySelector("#bottom");
    if (bottom) {
      bottom.scrollIntoView({ behavior: "smooth" });
      // bottom.scrollIntoView();
      // bottom.scrollTop = bottom.scrollHeight;
    }
  };

  useEffect(scrollToBottom, []);

  const handleCommand = (cmd) => {
    const w = cmd.split(" ");
    const command = w[0];
    const argv = w.slice(1);

    const Component = commands[command];
    pushToStack(
      Component
        ? Component
        : () => <Line>exsh: Unknown command: {command}</Line>,
      command,
      argv
    );
  };

  return (
    <Width width="800px" style={{ height: "100%" }}>
      <Flex>
        <div style={{ flex: "1" }} id="scrollbar">
          <div>
            <ASCIILogo />
            <Line>
              <Emphasis>Sudocrypt v10.0</Emphasis>
            </Line>
            <Line>
              Run the <Code>help</Code> command to start playing.
            </Line>
            {stack.map(({ Component }, i) => (
              <Component key={i} />
            ))}
            <div id="bottom" />
          </div>
          <Prompt onSubmit={handleCommand} disabled={!promptActive} />
        </div>
      </Flex>
    </Width>
  );
}
