import { conn } from "@/libs/mysql";
import Materias from "../components/Materias/Materias";


const columnas = [
  {name: "NOMBRE", uid: "nombre"},
  {name: "PROFESOR", uid: "profesor"},
  {name: "UNIDAD DE CREDITO", uid: "unidad_credito"},
  {name: "CEDULA", uid: "semestre"},
];
async function loadEstudiantes() {
  const estudiantes = await conn.query("SELECT * FROM estudiantes");
  return estudiantes;
}

export const dynamic = "force-dynamic";

async function EstudiantesPage() {
  const estudiantes = await loadEstudiantes();

  return (
    <div>
      <Materias estudiantesData={estudiantes}  columns={columnas} />
    </div>
  );
}

export default EstudiantesPage;
