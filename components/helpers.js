import styled from "@emotion/styled";

export const FlexContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 30px 0;
  align-items: center;
`;

export const ButtonA = styled.a`
  text-decoration: none;
  font-size: 0.9rem;
  text-transform: uppercase;
  color: #eaeaef;
  text-align: center;
  font-weight: bold;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    outline: none;
    background: #fff;
    color: #000;
  }
`;

export const H1 = styled.h1`
  font-size: 3rem;
  margin-bottom: 10px;

  @media screen and (max-width: 620px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 350px) {
    font-size: 1.3rem;
  }
`;

export const Desc = styled.div`
  font-size: 1.5rem;

  @media screen and (max-width: 620px) {
    font-size: 1rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  display: block;
  background: #eaeaef10;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  padding: 15px 20px;

  &:active,
  &:focus {
    outline: none;
    background: #eaeaef20;
  }
`;

export const Button = styled.button`
  display: block;
  text-decoration: none;
  max-width: 350px;
  margin: 30px auto;
  width: 95%;
  border: 1px solid #eaeaef;
  padding: 10px 0;
  text-transform: uppercase;
  color: #eaeaef;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;
  background: none;
  font-weight: 600;
  letter-spacing: 2px;

  &:hover,
  &:active,
  &:focus {
    outline: none;
    background: #eaeaef;
    color: #000;
  }

  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

export const Line = styled.div`
  width: 100%;
  font-size: 1.1rem;
  line-height: 1.8rem;
`;

export const Emphasis = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 2.2rem;
`;

export const Spacing = styled(Line)`
  margin: 20px 0;
`;

export const Width = styled.div`
  max-width: ${(p) => p.width};
  width: ${(p) => p.widthPercentage || "100%"};
`;

export const ButtonRect = styled.button`
  border: none;
  padding: 15px 20px;
  text-transform: uppercase;
  color: #eaeaef90;
  text-align: center;
  font-size: 0.8rem;
  cursor: pointer;
  background: #eaeaef10;
  font-weight: 600;
  letter-spacing: 2px;
  border-radius: 5px;

  &:hover,
  &:active,
  &:focus {
    outline: none;
    background: #eaeaef20;
  }

  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

export const Code = styled.span`
  font-size: 0.9rem;
  background: #eaeaef30;
  padding: 2px 4px;
  border: none;
  border-radius: 3px;
`;
