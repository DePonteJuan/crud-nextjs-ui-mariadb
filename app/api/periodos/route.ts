import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM periodos");
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
  
      if (!data.get("periodo")) {
        return NextResponse.json(
          {
            message: "Name is required",
          },
          {
            status: 400,
          }
        );
      }
  
      const result = await conn.query("INSERT INTO periodos SET ?", {
        
        periodo: data.get("periodo"),
      });
  
      return NextResponse.json({
        periodo: data.get("periodo"),
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
