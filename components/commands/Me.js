import React from "react";
import Loading from "../Loading";
import { Line, Emphasis } from "../helpers";

// const Help = ({ identifier, gameState, doneLoading }) => {
const Me = ({ gameState }) => {
  const nth = (n) =>
    ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";

  return gameState.loading ? (
    <Loading />
  ) : gameState.me.user !== {} ? (
    <>
      <Line>
        {gameState.me.user.exunite || gameState.me.user.admin ? (
          <Emphasis style={{ color: "#2977f5" }}>
            {gameState.me.user.name} (@{gameState.me.user.username}) [NC]
          </Emphasis>
        ) : (
          <Emphasis>
            {gameState.me.user.name} (@{gameState.me.user.username})
          </Emphasis>
        )}
      </Line>
      <Line>Keys: {gameState.me.user.keys}</Line>
      <Line>Points: {gameState.me.user.points}</Line>
      <Line>Discord: {gameState.me.user.discord}</Line>
      <Line>Institution: {gameState.me.user.institution}</Line>
      <Line>Email: {gameState.me.user.email}</Line>
      {gameState.me.user.dq && (
        <Line style={{ color: "red" }}>
          You are disqualified, please contact an admin if you think this is a
          mistake.
        </Line>
      )}
    </>
  ) : (
    <Loading />
  );
};

export default Me;
