import Estudiantes from "@/app/components/Estudiantes/Estudiantes";
import { conn } from "@/libs/mysql";


const columnas = [
  {name: "NOMBRE", uid: "nombre"},
  {name: "EMAIL", uid: "email"},
  {name: "TELEFONO", uid: "telefono"},
  {name: "CEDULA", uid: "cedula_de_identidad"},
  //{name: "FECHA_DE_ADMISION", uid: "fecha_de_admision"},
  {name: "ACCIONES", uid: "acciones"},
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
      <Estudiantes estudiantesData={estudiantes}  columns={columnas} />
    </div>
  );
}

export default EstudiantesPage;
