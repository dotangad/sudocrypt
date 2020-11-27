import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Status from "./Status";
import Options from "./Options";
import { Code, Line } from "../helpers";

// const Help = ({ identifier, gameState, doneLoading }) => {
const Move = ({ gameState, argv }) => {
  if (["up", "down", "left", "right"].indexOf(argv[0]) === -1) {
    return <Line>An error occurred: Invalid option</Line>;
  }

  if (gameState.loading) {
    return <Loading />;
  }

  const [res, setRes] = useState({});
  const [loading, setLoading] = useState(loading);
  const [newGS, setNewGS] = useState({ loading: true });

  useEffect(() => {
    async function f() {
      const l = await (
        await fetch("/api/game/move", {
          method: "POST",
          body: JSON.stringify({ direction: argv[0] }),
        })
      ).json();
      setRes(l);
      const currentNode = await (await fetch("/api/game/current-node")).json();
      const me = await (await fetch("/api/auth/me")).json();
      setNewGS({ loading: false, me, currentNode });

      setLoading(false);
    }

    f();
  }, []);

  return loading || newGS.loading ? (
    <Loading />
  ) : res.success ? (
    <>
      <Line>Move successful.</Line>
      <Status gameState={newGS} />
      <Line>Movement options -</Line>
      <Options gameState={newGS} />
    </>
  ) : (
    <Line>An error occurred: {res.message}</Line>
  );
};

export default Move;
