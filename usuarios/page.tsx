import { conn } from "@/libs/mysql";
import Materias from "../components/Materias/Materias";
import Image from "next/image";

const columnas = [
  {name: "NOMBRE", uid: "nombre"},
  {name: "EMAIL", uid: "email"},
  {name: "CONTRASENA", uid: "contrasena"},
  {name: "USUARIO", uid: "usuario"},
  {name: "ID-CARGO", uid: "id-cargo"},
];
async function loadEstudiantes() {
  const estudiantes = await conn.query("SELECT * FROM materias");
  return estudiantes;
}

export const dynamic = "force-dynamic";

async function EstudiantesPage() {
  const estudiantes = await loadEstudiantes();

  return (
    <div>
      <div className="tabla"><Materias estudiantesData={estudiantes}  columns={columnas} /></div>

      <div className="menu">

<div className="title"><h1>OPERACIONES CRUD</h1></div>
<div className="logos"><Image src="/logo.jpeg" alt={""} width={150} height={150}/></div>

<div id="opciones">
  <div className=" Inicio">
    <Image src="/home.png" alt="" width={27} height={27}/>
    <a className="titulo" href="#"><h2>Inicio</h2></a>
  </div>

  <div className="Docentes">
    <Image src="/save.png" alt={""} width={27} height={27}/>
    <a className="titulo" href="#"><h2>Docentes</h2></a>
  </div>

  <div className="Estudiantes">
    <Image src="/student.png" alt={""} width={27} height={27}/>
    <a className="titulo" href="#"><h2>Estudiante</h2></a>
  </div>

  <div className="Materias">
    <Image src="/materias.png" alt={""} width={27} height={27}/>
    <a className="titulo" href="#"><h2>Materias</h2></a>
  </div>

  <div className="Secciones">
    <Image src="/materias.png" alt={""} width={27} height={27}/>
    <a className="titulo" href="#"><h2>Secciones</h2></a>
  </div>

  <div className="Periodo">
    <Image src="/materias.png" alt={""} width={27} height={27}/>
    <a className="titulo" href="#"><h2>Periodo</h2></a>
  </div>

  <div className="Usuarios">
    <Image src="/users.png" alt={""} width={27} height={27}/>
    <a className="titulo" href="#"><h2>Usuarios</h2></a>
  </div>

</div>
</div>

    </div>
  );
}

export default EstudiantesPage;