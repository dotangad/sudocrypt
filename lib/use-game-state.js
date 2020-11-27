/*
 * In the gameState object:
 * - currentNode
 * - user
 */
import { useRouter } from "next/router";
import { useState } from "react";

const states = {};

export function useGameState(identifier) {
  const router = useRouter();
  const [rtrn, setRtrn] = useState({ loading: true, me: {}, currentNode: {} });
  const [sent, setSent] = useState(false);
  if (states[identifier]) {
    return [identifier, states[identifier]];
  }

  async function f() {
    if (!sent) {
      setSent(true);
      const me = await (await fetch("/api/auth/me")).json();
      const currentNode = await (await fetch("/api/game/current-node")).json();
      const loading = false;

      if (!me.success) {
        router.push(`/error?error=${me.message}`);
      }

      if (!currentNode.success) {
        router.push(`/error?error=${currentNode.message}`);
      }

      setRtrn({ loading, me, currentNode });
    }
  }
  f();

  const identifier_ = Date.now();
  states[identifier_] = rtrn;
  return [identifier_, rtrn];
}
