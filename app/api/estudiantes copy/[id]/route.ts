import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
    try {
      const result = await conn.query("SELECT * FROM estudiantes WHERE id = ?", [
        request.params.id,
      ]);
  
      if (result.length === 0) {
        return NextResponse.json(
          {
            message: "Producto no encontrado",
          },
          {
            status: 404,
          }
        );
      }
  
      return NextResponse.json(result[0]);
    } catch (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(request, { params }) {
    console.log(params.id)
    try { 
      const result = await conn.query("DELETE FROM estudiantes WHERE id = ?", [
        params.id
      ]);
  
      if (result.affectedRows === 0) {
        return NextResponse.json(
          {
            message: "Producto no encontrado",
          },
          {
            status: 404,
          }
        );
      }
  
      return new Response(null, {
        status: 204,
      });
    } catch (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }
  
  export async function PUT(request, { params }) {

    try {
      const data = await request.formData();
      const id = data.get("id")
      const updateData = {  
      nombre: data.get("nombre"),
      email: data.get("email"),
      telefono: data.get("telefono"),
      cedula_de_identidad: data.get("cedula_de_identidad"),
      //fecha_de_admision: data.get("fecha_de_admision"),
      };
  
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
  
    
  
        const result = await conn.query("UPDATE estudiantes SET ? WHERE id = ?", [
          updateData,
          id,
        ]);
  
        if (result.affectedRows === 0) {
          return NextResponse.json(
            {
              message: "estudianteso no encontrado",
            },
            {
              status: 404,
            }
          );
        }
  
        const updatedestudiantes = await conn.query(
          "SELECT * FROM estudiantes WHERE id = ?",
          [id]
        );
  
        return NextResponse.json(updatedestudiantes[0]);
      
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }