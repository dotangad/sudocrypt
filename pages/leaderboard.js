import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Loading from "../components/Loading";
import { ButtonA, Spacing } from "../components/helpers";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 30px 0;
  border: 1px solid white;
`;

const Row = styled.tr``;
const HeaderRow = styled(Row)`
  background: #000;
`;

const Cell = styled.td`
  padding: 15px 5px;
  text-align: center;
`;

const HeaderCell = styled.th`
  padding: 15px 5px;
  text-align: center;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: bold;
`;

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function f() {
      const res = await (await fetch("/api/leaderboard")).json();
      setLoading(false);

      if (res.success) {
        setUsers(res.users);
      } else {
        setError(res.message);
      }
    }
    f();
  }, []);

  return loading ? (
    <Loading />
  ) : error ? (
    <Loading error={error} />
  ) : (
    <>
      <Spacing>
        <ButtonA href="/">&lt;- Back to command line</ButtonA>
      </Spacing>
      <Table>
        <HeaderRow>
          <HeaderCell>#</HeaderCell>
          <HeaderCell>username</HeaderCell>
          <HeaderCell>points</HeaderCell>
        </HeaderRow>
        {users.map((u, i) => (
          <Row key={i}>
            <Cell>{i + 1}</Cell>
            <Cell style={{ color: u.exunite ? "#2977f5" : "inherit" }}>
              {u.username}
              {u.exunite ? " [NC]" : ""}
            </Cell>
            <Cell>{u.points}</Cell>
          </Row>
        ))}
      </Table>
    </>
  );
}
