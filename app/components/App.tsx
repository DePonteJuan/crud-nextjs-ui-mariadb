import Estudiantes from "@/app/components/Estudiantes";
import { conn } from "@/libs/mysql";

let columnas = {};
async function loadEstudiantes() {
  const estudiantes = await conn.query("SELECT * FROM estudiantes");
  return estudiantes;
}
loadEstudiantes().then((estudiantes) => {
  Object.keys(estudiantes).forEach((key) => {
    if (key !== "id") {
      columnas["name"] = key.toUpperCase();
      columnas["uid"] = key;
    }
  });
});
export const dynamic = "force-dynamic";

async function EstudiantesPage() {
  const estudiantes = await loadEstudiantes();

  return (
    <div>
      <Estudiantes data={estudiantes} key={estudiantes.id} columns={columnas} />
    </div>
  );
}

export default EstudiantesPage;
