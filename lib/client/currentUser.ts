import "client-only";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

export function useCurrentUser(unauthenticatedRedirect = "/api/auth/signin") {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return { redirectTo: unauthenticatedRedirect };
    },
  });
  const user = session?.user as User;
  return { user, status };
}
