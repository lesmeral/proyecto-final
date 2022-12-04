import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Home from "./Pages/home";
import CrudAnimales from "./Pages/cruds/crud-animales";
import CrudClientes from "./Pages/cruds/crud-clientes";
import CrudDoctores from "./Pages/cruds/crud-doctores";

function App() {
  return (
    <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/CrudClientes">Crud clientes</Nav.Link>
                <Nav.Link href="/CrudDoctores">Crud Doctores</Nav.Link>
                <Nav.Link href="/CrudAnimales">Crud Animales</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CrudAnimales" element={<CrudAnimales />} />
          <Route path="/CrudClientes" element={<CrudClientes />} />
          <Route path="/CrudDoctores" element={<CrudDoctores />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
