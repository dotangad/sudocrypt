import React from "react";
import Loading from "../Loading";
import { Code, Line } from "../helpers";

// const Help = ({ identifier, gameState, doneLoading }) => {
const Status = ({ gameState }) => {
  if (gameState.loading) {
    return <Loading />;
  }

  if (gameState.currentNode.node.type === "OpenLevel") {
    return (
      <>
        {gameState.currentNode.node.message && (
          <Line>{gameState.currentNode.node.message}</Line>
        )}
        <Line>
          On node {gameState.currentNode.nodeN} -{" "}
          {gameState.currentNode.node.type}
        </Line>
        {gameState.me.activeLevel ? (
          <>
            <Line>
              Run the <Code>level</Code> command to see your current level
            </Line>
            <Line>
              Run the <Code>answer &lt;your answer&gt;</Code> command to attempt
              an answer
            </Line>
          </>
        ) : (
          <Line>
            Run the <Code>options</Code> command to see where you can move from
            here.
          </Line>
        )}
      </>
    );
  }

  if (
    gameState.currentNode.node.type === "Key" ||
    gameState.currentNode.node.type === "Empty"
  ) {
    return (
      <>
        {gameState.currentNode.node.message && (
          <Line>{gameState.currentNode.node.message}</Line>
        )}
        {gameState.currentNode.node.type === "Key" &&
          gameState.me.user.nodeSpecificActionTaken && (
            <Line>You have received a key from the game.</Line>
          )}
        <Line>
          On node {gameState.currentNode.nodeN} -{" "}
          {gameState.currentNode.node.type}
        </Line>
        <Line>
          Run the <Code>options</Code> command to see where you can move.
        </Line>
      </>
    );
  }

  if (gameState.currentNode.node.type === "Portal") {
    return (
      <>
        {gameState.currentNode.node.message && (
          <Line>{gameState.currentNode.node.message}</Line>
        )}
        <Line>
          On node {gameState.currentNode.nodeN} -{" "}
          {gameState.currentNode.node.type}
        </Line>
        <Line>
          Run the <Code>teleport</Code> command to teleport to node{" "}
          {gameState.currentNode.node.portalTo}.
        </Line>
      </>
    );
  }

  if (gameState.currentNode.node.type === "LockedLevel") {
    return (
      <>
        {gameState.currentNode.node.message && (
          <Line>{gameState.currentNode.node.message}</Line>
        )}
        <Line>
          On node {gameState.currentNode.nodeN} -{" "}
          {gameState.currentNode.node.type}
        </Line>
        {gameState.me.user.nodeSpecificActionTaken ? (
          gameState.me.activeLevel ? (
            <>
              <Line>A key has been extracted from you by the game.</Line>
              <Line>
                Run the <Code>level</Code> command to see your current level
              </Line>
              <Line>
                Run the <Code>answer &lt;your answer&gt;</Code> command to
                attempt an answer
              </Line>
            </>
          ) : (
            <Line>
              Run the <Code>options</Code> command to see where you can move.
            </Line>
          )
        ) : (
          <Line>You do not have enough keys to unlock this level</Line>
        )}
      </>
    );
  }

  return <Line>----</Line>;
};

export default Status;
