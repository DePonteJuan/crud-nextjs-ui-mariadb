import mysql from "serverless-mysql";

export const conn = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: "12345678",
    port: 3306,
    database: "crud-test",
  },
});
