import React from "react";
import { signIn, useSession } from "next-auth/client";
import { useMe } from "../lib/hooks";
import ASCIILogo from "../components/ASCIILogo";
import Loading from "../components/Loading";
import Redirect from "../lib/Redirect";
import Play from "../components/Play";
import {
  FlexContainer,
  Width,
  ButtonA,
  ButtonRect,
  Spacing,
  Line,
  Emphasis,
} from "../components/helpers";

export default function Home() {
  const [session, loading] = useSession();
  const { isLoading, error, data } = useMe();

  if (session && !data?.user?.username) {
    return <Redirect to="/auth/initial" />;
  }

  return loading || isLoading ? (
    <Loading />
  ) : error ? (
    <Loading error={error} />
  ) : session ? (
    <Play />
  ) : (
    <FlexContainer>
      <ASCIILogo />
      <Width width="450px">
        <Line>
          <Emphasis>
            <center>Sudocrypt v10.0</center>
          </Emphasis>
        </Line>

        <Line>
          <center>
            <ButtonA
              href="https://www.facebook.com/sudocrypt/posts/3675114892520177"
              target="_blank">
              Prizes
            </ButtonA>{" "}
            worth INR 85,000 have been announced. Sign in to start playing and
            win them!
          </center>
        </Line>
        <Spacing>
          <Spacing>
            <center>
              We will be relaying all communication and confirming leads on the{" "}
              <ButtonA
                href="https://discord.com/invite/5HJPxzp"
                target="_blank">
                Discord server
              </ButtonA>
              .
            </center>
          </Spacing>
          <Line>
            <center>
              <ButtonRect onClick={() => signIn("discord")}>
                Sign In with Discord
              </ButtonRect>
            </center>
          </Line>
        </Spacing>
      </Width>
    </FlexContainer>
  );
}
