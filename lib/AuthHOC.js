import React from "react";
import { useSession } from "next-auth/client";
import { useMe } from "./hooks";
import Loading from "../components/Loading";
import Redirect from "./Redirect";

export function Authenticated({ children }) {
  const [session, loading] = useSession();

  return loading ? (
    <Loading />
  ) : session ? (
    children
  ) : (
    <Loading error="You must be authenticated to view this page" />
  );
}

export function UnAuthenticated({ children }) {
  const [session, loading] = useSession();

  return loading ? (
    <Loading />
  ) : session ? (
    <Loading error="You must be authenticated to view this page" />
  ) : (
    children
  );
}

export function Initial({ children }) {
  const { isLoading, error, data } = useMe();

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Loading error={error} />
  ) : data?.user?.username ? (
    children
  ) : (
    <Redirect to="/auth/initial" />
  );
}
