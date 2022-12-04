import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const url = "http://localhost:3000/";

export default class CrudDoctores extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      name: "",
      username: "",
      email: "",
      password: "",
      tipoModal: "",
    },
  };
  //funciones
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  seleccionarCampo = (data) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
    console.log(this.state.form);
  };

  //peticiones
  //GET
  peticionGet = () => {
    axios.get(url + "doctor/doctorall").then(
      (response) => {
        this.setState({ data: response.data.result });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  //PATCH
  peticionPatch = () => {
    axios.patch(url + "doctor/" + this.state.form.username, this.state.form).then(
      (response) => {
        this.modalInsertar();
        this.peticionGet();
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  //POST
  peticionPost = async () => {
    await axios.post(url + "doctor/create", this.state.form).then(
      (response) => {
        this.modalInsertar();
        this.peticionGet();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  //DELETE
  peticionDelete = () => {
    axios.delete(url + "doctor/" + this.state.form.username).then(
      (response) => {
        this.peticionGet();
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const { form } = this.state;
    return (
      <div className="app">
        <br />
        <Button
          className="btn-crear"
          variant="outline-primary"
          onClick={() => {
            this.setState({ form: null, tipoModal: "insertar" });
            this.modalInsertar();
          }}
        >
          Crear usuario
        </Button>
        <br />
        <br />
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>USUARIO</th>
              <th>EMAIL</th>
              <th>CONTRASEÑA</th>
              <th>EDITAR</th>
              <th>ELIMINAR</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((data) => {
              return (
                <tr>
                  <td>{data._id}</td>
                  <td>{data.name}</td>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                  <td>{data.password}</td>
                  <td>
                    <Button
                      className="btn-editar"
                      variant="btn btn-primary"
                      onClick={() => {
                        this.seleccionarCampo(data);
                        this.modalInsertar();
                      }}
                    >
                      Editar
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="btn-eliminar"
                      variant="btn btn-danger"
                      onClick={() => {
                        this.seleccionarCampo(data);
                        this.peticionDelete();
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: "block" }}>
            <span
              style={{ float: "right" }}
              onClick={() => this.modalInsertar()}
            >
              X
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="name">NOMBRE</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
                value={form ? form.name : ""}
              />
              <br />
              <label htmlFor="user">USUARIO</label>
              <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                onChange={this.handleChange}
                value={form ? form.username : ""}
              />
              <br />
              <label htmlFor="email">EMAIL</label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                onChange={this.handleChange}
                value={form ? form.email : ""}
              />
              <br />
              <label htmlFor="pass">CONTRASEÑA</label>
              <input
                className="form-control"
                type="text"
                name="password"
                id="password"
                onChange={this.handleChange}
                value={form ? form.password : ""}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.tipoModal == "insertar" ? (
              <Button
                className="btn-guardar"
                variant="btn btn-primary"
                onClick={() => this.peticionPost()}
              >
                Guardar
              </Button>
            ) : (
              <Button
                className="btn-actualizar"
                variant="btn btn-primary"
                onClick={() => this.peticionPatch()}
              >
                Actualizar
              </Button>
            )}
            <Button
              className="btn-cancelar"
              variant="btn btn-danger"
              onClick={() => this.modalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
