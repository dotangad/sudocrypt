import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import ASCIILogo from "../components/ASCIILogo";

const FlexContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Desc = styled.div`
  font-size: 1.5rem;

  @media screen and (max-width: 620px) {
    font-size: 1rem;
  }
`;

export default function Loading({ error }) {
  const LENGTH = 10;
  const [n, setN] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setN((x) => (x + 1) % LENGTH), 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <FlexContainer>
      <ASCIILogo />
      {error ? (
        <Desc style={{ color: "red" }}>{error}</Desc>
      ) : (
        <Desc>
          {Array(LENGTH)
            .fill("-")
            .map((_, i) =>
              i === n ? (n % 2 === 0 ? "C" : "c") : i < n ? "-" : "o"
            )
            .join(" ")}
        </Desc>
      )}
    </FlexContainer>
  );
}
