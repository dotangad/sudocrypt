import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { Code, Line } from "../helpers";

// const Help = ({ identifier, gameState, doneLoading }) => {
const Options = ({ gameState }) => {
  if (gameState.loading) {
    return <Loading />;
  }

  const [res, setRes] = useState({});
  const [loading, setLoading] = useState(loading);

  useEffect(() => {
    async function f() {
      const l = await (await fetch("/api/game/options")).json();
      setRes(l);
      setLoading(false);
    }

    f();
  }, []);

  return loading ? (
    <Loading />
  ) : res.success ? (
    <>
      {Object.entries(res.options).map(([d, n], i) => (
        <Line key={i}>
          {d}: {n}
        </Line>
      ))}

      <Line>
        Move with the <Code>move &lt;direction&gt;</Code> command.
      </Line>
    </>
  ) : (
    <>
      <Line>An error occurred: {res.message}</Line>
    </>
  );
};

export default Options;
