import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
export async function GET(request, { query }) {
    console.log(params)
    try {

      const result = await conn.query( 
        'SELECT * FROM usuarios WHERE name = ? AND password = ?',[
        query.username,
        query.password
      ]);
  
      if (result.length === 0) {
        return NextResponse.json(
          {
            message: "Usuario no encontrado/credenciales invalidas",
          },
          {
            status: 404,
          }
        );
      }
  
      return NextResponse.json(response[0]);
    } catch (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }