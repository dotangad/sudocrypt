import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { Code, Line } from "../helpers";

// const Help = ({ identifier, gameState, doneLoading }) => {
const Level = ({ gameState }) => {
  if (gameState.loading) {
    return <Loading />;
  }

  if (
    gameState.currentNode.node.type === "OpenLevel" ||
    gameState.currentNode.node.type === "LockedLevel"
  ) {
    const [level, setLevel] = useState({});
    const [loading, setLoading] = useState(loading);

    useEffect(() => {
      async function f() {
        const l = await (await fetch("/api/game/level")).json();
        setLevel(l);
      }

      f().then(() => setLoading(false));
    }, []);

    return loading ? (
      <Loading />
    ) : (
      <>
        {gameState.currentNode.node.message && (
          <Line>{gameState.currentNode.node.message}</Line>
        )}
        {level.solved ? (
          <Line>
            You've solved this level. Run the <Code>options</Code> command to
            see movement options.
          </Line>
        ) : (
          <Line dangerouslySetInnerHTML={{ __html: level.level }} />
        )}
      </>
    );
  }

  return <Line>You are currently not on a level</Line>;
};

export default Level;
