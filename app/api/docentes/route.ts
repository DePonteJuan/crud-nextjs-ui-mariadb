import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM docentes");
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request) {
    try {
      const data = await request.formData();
  
      if (!data.get("nombre")) {
        return NextResponse.json(
          {
            message: "Name is required",
          },
          {
            status: 400,
          }
        );
      }
  
      const result = await conn.query("INSERT INTO docentes SET ?", {
        nombre: data.get("nombre"),
        email: data.get("email"),
        cedula_de_identidad: data.get("cedula_de_identidad"),
        telefono: data.get("telefono"),
      apellido: data.get("apellido"),
      });
  
      return NextResponse.json({
        nombre: data.get("nombre"),
        email: data.get("email"),
        cedula_de_identidad: data.get("cedula_de_identidad"),
        telefono: data.get("telefono"),
      apellido: data.get("apellido"),
        id: result.insertId,
      });
    } catch (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
