import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { signOut } from "next-auth/client";
import { rbv, angi, somesh } from "./ascii";
import Loading from "../components/Loading";
import { Line } from "../components/helpers";

import Help from "../components/commands/Help";
import Status from "../components/commands/Status";
import Level from "../components/commands/Level";
import Answer from "../components/commands/Answer";
import Options from "../components/commands/Options";
import Move from "../components/commands/Move";
import Teleport from "../components/commands/Teleport";
import Me from "../components/commands/Me";

const ASCIIContainer = styled.pre`
  font-size: 6px;
  line-height: 7px;
  color: #eaeaef70;
`;

const commands = {
  logout: () => {
    signOut();

    return <Loading />;
  },
  ishir: () => <Line>archor</Line>,
  rbv: () => (
    <center>
      <ASCIIContainer>{rbv}</ASCIIContainer>
      <Line>rbv</Line>
    </center>
  ),
  angi: () => (
    <center>
      <ASCIIContainer>{angi}</ASCIIContainer>
      <Line>dvlpr</Line>
    </center>
  ),
  somesh: () => (
    <center>
      <ASCIIContainer>{somesh}</ASCIIContainer>
      <Line>supreme leader</Line>
    </center>
  ),
  ok: () => <Line>ok</Line>,
  leaderboard: () => {
    const router = useRouter();
    router.push("/leaderboard");

    return <Loading />;
  },
  map: () => {
    const router = useRouter();
    router.push("/map");

    return <Loading />;
  },
  explain: () => {
    const router = useRouter();
    router.push(
      "https://docs.google.com/document/d/e/2PACX-1vRIxkDM-y5-Ymjq_Mv0CYx213FdEambLM4CiXW4n_DL8iKs-Q5FoDudGNLnhSu3524i8Eu5vRKRztr9/pub"
    );

    return <Loading />;
  },
  clear: () => {
    location.reload();

    return <Line>clearing</Line>;
  },
  help: Help,
  status: Status,
  level: Level,
  answer: Answer,
  options: Options,
  move: Move,
  teleport: Teleport,
  me: Me,
};

export default commands;
