import styled from "@emotion/styled";

export const ASCIILOGO = `
((((((((((((((((((((((((((((((((((((((((
((((((((((((((((((((((((((((((((((((((((
((((((((((((((((((((((((((((((((((((((((
((((((((((((((((((((,,,,,,,,,(((((((((((
((((((((((((((((,,,,,,,,,    (((((((((((
((((((((((((,,,,,,,,,        (((((((((((
((((((((((((....,        (((((((((((((((
((((((((((((....     ,,,,,,,,(((((((((((
((((((((((((....     ,,,,    (((((((((((
((((((((((((....             (((((((((((
((((((((((((....             (((((((((((
(((((((((((((...    ....     (((((((((((
(((((((((((((((,,,,,,,,,     (((((((((((
((((((((((((.,,,,,,,         (((((((((((
((((((((((((....         (((((((((((((((
((((((((((((....     (((((((((((((((((((
((((((((((((((((((((((((((((((((((((((((
((((((((((((((((((((((((((((((((((((((((
((((((((((((((((((((((((((((((((((((((((`;

const ASCIILOGOContainer = styled.pre`
  margin: 20px 0;
  font-size: 0.7rem;
  line-height: 0.9rem;

  @media screen and (max-width: 500px) {
    font-size: 0.6rem;
  }

  @media screen and (max-width: 350px) {
    font-size: 0.4rem;
  }
`;

export default function ASCIILogo() {
  return <ASCIILOGOContainer>{ASCIILOGO}</ASCIILOGOContainer>;
}
