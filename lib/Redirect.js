import { useRouter } from "next/router";
import Loading from "../components/Loading";

function RedirectPage({ to }) {
  const router = useRouter();
  router.push(to);

  return <Loading />;
}

export default RedirectPage;
