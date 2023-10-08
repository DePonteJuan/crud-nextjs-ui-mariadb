'use client'
import styles from "./estilos/login.module.css";

import logo from "./estilos/imagenes/logo.jpeg";
import slider1 from "./estilos/imagenes/slider1.jpg";
import slider2 from "./estilos/imagenes/slider2.jpg";
import slider3 from "./estilos/imagenes/slider3.jpg";
import slider4 from "./estilos/imagenes/slider4.jpg";


import { useState } from "react";
import { Image } from "@nextui-org/react";


export default function Login() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password)
    };

    const usernameHandler =  (e) => {
        setUsername(e.target.value);
    }

    const passwordHandler =  (e) => {
        setPassword(e.target.value);
    }
// codigos distintos
  
  return (
    <>
      <h1 className={styles.Title}>HUMBOLDT CRUD</h1>
      <div className={styles.loginBox}>
        <center>
          <Image src={logo} className={styles.Logo} alt="Logo sice" />
        </center>
        <h1>Iniciar Sesión</h1>
        <form>
          <input
            type="text"
            placeholder="Usuario"
            onChange={usernameHandler}
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={passwordHandler
            }
          />
          <input type="submit" onClick={handleSubmit} value="Ingresar" />
          
          <a href="/login">¿Olvidó su contraseña?</a>
          <br />
        </form>
      </div>
      <div className={styles.sliderFrame}>
        <ul>
          <li>
            <Image src={slider1} alt="" />
          </li>
          <li>
            <Image src={slider2} alt="" />
          </li>
          <li>
            <Image src={slider3} alt="" />
          </li>
          <li>
            <Image src={slider4} />
          </li>
        </ul>
      </div>
      </>
  );
}

