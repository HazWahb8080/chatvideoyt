import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  return Response.json(session);
}
