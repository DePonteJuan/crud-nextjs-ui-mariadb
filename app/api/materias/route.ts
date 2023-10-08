import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM materias");
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
  
      const result = await conn.query("INSERT INTO materias SET ?", {
        nombre: data.get("nombre"),
        profesor: data.get("profesor"),
        unidad_credito: data.get("unidad_credito"),
        semestre: data.get("semestre"),
      });
  
      return NextResponse.json({
        nombre: data.get("nombre"),
        email: data.get("profesor"),
        unidad_credito: data.get("unidad_credito"),
        semestre: data.get("semestre"),
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
