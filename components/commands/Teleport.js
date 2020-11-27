import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { Code, Line } from "../helpers";

// const Help = ({ identifier, gameState, doneLoading }) => {
const Teleport = ({ gameState }) => {
  if (gameState.loading) {
    return <Loading />;
  }

  const [res, setRes] = useState({});
  const [loading, setLoading] = useState(loading);

  useEffect(() => {
    async function f() {
      const l = await (
        await fetch("/api/game/teleport", { method: "POST" })
      ).json();
      setRes(l);
    }

    f().then(() => setLoading(false));
  }, []);

  return loading ? (
    <Loading />
  ) : res.success ? (
    <Line>
      Teleport successful. Run the <Code>status</Code> command for more
      information.
    </Line>
  ) : (
    <Line>An error occurred: {res.message}</Line>
  );
};

export default Teleport;
