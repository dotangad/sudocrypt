import React from "react";
import styled from "@emotion/styled";
import ASCIILogo from "../ASCIILogo";
import { Emphasis, Line, Code } from "../helpers";

const RightPaddedCell = styled.td`
  padding-right: 15px;
`;

// const Help = ({ identifier, gameState, doneLoading }) => {
const Help = () => {
  return (
    <>
      <ASCIILogo />
      <Line>
        <Emphasis>Sudocrypt v10.0</Emphasis>
      </Line>
      <Line>Commands:</Line>
      <table>
        <tbody>
          <tr>
            <RightPaddedCell>
              <Code>help</Code>
            </RightPaddedCell>
            <td>See this message again</td>
          </tr>
          <tr>
            <RightPaddedCell>
              <Code>status</Code>
            </RightPaddedCell>
            <td>See current game state</td>
          </tr>
          <tr>
            <RightPaddedCell>
              <Code>me</Code>
            </RightPaddedCell>
            <td>See your profile, rank, keys and points</td>
          </tr>
          <tr>
            <RightPaddedCell>
              <Code>clear</Code>
            </RightPaddedCell>
            <td>Clear console</td>
          </tr>
          <tr>
            <RightPaddedCell>
              <Code>explain</Code>
            </RightPaddedCell>
            <td>Read about the format and gameplay</td>
          </tr>
          <tr>
            <RightPaddedCell>
              <Code>options</Code>
            </RightPaddedCell>
            <td>See movement options</td>
          </tr>
          <tr>
            <RightPaddedCell>
              <Code>level</Code>
            </RightPaddedCell>
            <td>See current level</td>
          </tr>
          <tr>
            <RightPaddedCell>
              <Code>answer &lt;your answer&gt;</Code>
            </RightPaddedCell>
            <td>Answer the level</td>
          </tr>
          <tr>
            <RightPaddedCell>
              <Code>map</Code>
            </RightPaddedCell>
            <td>See map</td>
          </tr>
          <tr>
            <RightPaddedCell>
              <Code>leaderboard</Code>
            </RightPaddedCell>
            <td>View leaderboard</td>
          </tr>
          <tr>
            <RightPaddedCell>
              <Code>logout</Code>
            </RightPaddedCell>
            <td>Log out of Sudocrypt</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Help;
