import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
    try {
      const result = await conn.query("SELECT * FROM periodos WHERE id = ?", [
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
      const result = await conn.query("DELETE FROM periodos WHERE id = ?", [
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
        
        periodo: data.get("periodo"),
      };
  
      if (!data.get("periodo")) {
        return NextResponse.json(
          {
            message: "periodo is required",
          },
          {
            status: 400,
          }
        );
      }
  
    
  
        const result = await conn.query("UPDATE periodos SET ? WHERE id = ?", [
          updateData,
          id,
        ]);
  
        if (result.affectedRows === 0) {
          return NextResponse.json(
            {
              message: "periodoso no encontrado",
            },
            {
              status: 404,
            }
          );
        }
  
        const updatedperiodos = await conn.query(
          "SELECT * FROM periodos WHERE id = ?",
          [id]
        );
  
        return NextResponse.json(updatedperiodos[0]);
      
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