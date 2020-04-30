import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import "./styles.css";
import "../../services/api";

import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";
import api from "../../services/api";

export default function Logon() {
  const [id, setId] = useState("");

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    const data = { id };
    console.log(data);
    try {
      const res = await api.post("sessions", data);
      console.log(res.data.name);
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", res.data.name);
      history.push("/profile");
    } catch (err) {
      alert("falha ao completar o login");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="logo" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            placerholder="Seu ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button   ">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="heroes" />
    </div>
  );
}
