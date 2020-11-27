import { useRouter } from "next/router";
import Loading from "../components/Loading";

export default function Error() {
  const router = useRouter();
  const { error } = router.query;

  return <Loading error={error} />;
}
