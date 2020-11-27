import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { Code, Line } from "../helpers";

// const Help = ({ identifier, gameState, doneLoading }) => {
const Answer = ({ gameState, argv }) => {
  if (gameState.loading) {
    return <Loading />;
  }

  if (
    gameState.currentNode.node.type === "OpenLevel" ||
    gameState.currentNode.node.type === "LockedLevel"
  ) {
    const [correct, setCorrect] = useState({});
    const [loading, setLoading] = useState(loading);
    const answer = argv[0];

    useEffect(() => {
      async function f() {
        const l = await (
          await fetch("/api/game/attempt", {
            method: "POST",
            body: JSON.stringify({ answer }),
          })
        ).json();
        setCorrect(l);
      }

      f().then(() => setLoading(false));
    }, []);

    return loading ? (
      <Loading />
    ) : correct.success ? (
      <>
        {correct.correct ? (
          <Line>
            Correct. Run the <Code>options</Code> command to see where you can
            move from here.
          </Line>
        ) : (
          <Line>That's not it chief.</Line>
        )}
      </>
    ) : (
      <Line>An error occurred: {correct.message}</Line>
    );
  }

  return <Line>No level</Line>;
};

export default Answer;
