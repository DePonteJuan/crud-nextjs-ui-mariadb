import withSession from "@/libs/session";
import Head from "next/head";
import { ServerInsertedHTMLContext } from "next/navigation";
import EstudiantesPage from "./estudiantes/page";
import Login from "./login/page";

export default function Home() {
  return (
    <>
      <Login />
    </>
  );
}
