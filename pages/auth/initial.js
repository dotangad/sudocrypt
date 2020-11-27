import React, { useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Authenticated } from "../../lib/AuthHOC";
import { useMe } from "../../lib/hooks";
import Loading from "../../components/Loading";
import Redirect from "../../lib/Redirect";
import {
  FlexContainer,
  Width,
  Input,
  Spacing,
  Line,
  ButtonRect,
} from "../../components/helpers";

const Error = styled(Line)`
  text-align: center;
  font-size: 0.9rem;
  color: #ff0000;
`;

const Avatar = styled.img`
  --dim: 100px;
  border: none;
  border-radius: 10000px;
  width: var(--dim);
  height: var(--dim);
  display: block;
  margin: 0 auto;
`;

export default function InitialInfo() {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const { isLoading, error: queryError, data } = useMe();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      const res = await (
        await fetch("/api/auth/initial", {
          method: "post",
          body: JSON.stringify(data),
        })
      ).json();

      setSubmitting(false);

      if (!res.success) {
        setError(res.message || "Internal Server Error");
      } else {
        router.push("/");
      }
    } catch (e) {
      return setError(e.message || "Internal Server Error");
    }
  };

  const errorsByField = {
    Username:
      "Username must be over 8 characters and only contain lowercase letters, numbers, underscores and periods",
    Name: "Name is required",
    Insitution: "Institution is required",
  };

  return isLoading || submitting ? (
    <Loading />
  ) : queryError ? (
    <Loading error={queryError} />
  ) : data?.user?.username ? (
    <Redirect to="/" />
  ) : (
    <Authenticated>
      <FlexContainer>
        <Width width="350px">
          <Spacing>
            {/* <ASCIILogo /> */}
            <Avatar
              src={
                !data.user ||
                !data.user.record ||
                !data.user.record.image ||
                /null.png$/.test(data.user.record.image)
                  ? "/logo-blue.png"
                  : data.user.record.image
              }
              style={{ marginBottom: "15px" }}
            />
            <center>
              <Line style={{ color: "#eaeaef80", fontSize: "1.1rem" }}>
                {data.user.discord}
              </Line>
              <Line style={{ color: "#eaeaef60", fontSize: "0.9rem" }}>
                {data.user.email}
              </Line>
            </center>
          </Spacing>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Spacing>
              <Input
                type="text"
                placeholder="Username"
                name="Username"
                onchange=""
                ref={register({
                  required: true,
                  max: 24,
                  min: 8,
                  maxLength: 80,
                  pattern: /^[a-z0-9_.]+$/i,
                })}
              />
            </Spacing>
            <Spacing>
              <Input
                type="text"
                placeholder="Name"
                name="Name"
                onchange=""
                ref={register({ required: true })}
              />
            </Spacing>
            <Spacing>
              <Input
                type="text"
                placeholder="Institution"
                name="Institution"
                onchange=""
                ref={register({ required: true })}
              />
            </Spacing>

            {errors !== {} && (
              <Spacing>
                <Error>{errorsByField[Object.keys(errors)[0]]}</Error>
              </Spacing>
            )}

            {error && <Error>{error}</Error>}

            <Spacing>
              <center>
                <ButtonRect type="submit">Submit</ButtonRect>
              </center>
            </Spacing>
          </form>
        </Width>
      </FlexContainer>
    </Authenticated>
  );
}
