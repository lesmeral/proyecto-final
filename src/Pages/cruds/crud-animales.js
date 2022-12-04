import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const url = "http://localhost:3000/";

export default class crudAnimales extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      name: "",
      userOwner: "",
      dateb: Date,
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
        dateb: data.dateb
      },
    });
    console.log(this.state.form);
  };

  //peticiones
  //GET
  peticionGet = () => {
    axios.get(url + "pet/petall").then(
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
    axios.patch(url + "pet/" + this.state.form.username, this.state.form).then(
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
    await axios.post(url + "pet/create", this.state.form).then(
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
    axios.delete(url + "pet/" + this.state.form.username).then(
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
              <th>USUARIO A CARGO</th>
              <th>FECHA DE CUMPLEAÑOS</th>
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
                  <td>{data.userOwner}</td>
                  <td>{data.dateb}</td>
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
              <label htmlFor="userOwner">USUARIO A CARGO</label>
              <input
                className="form-control"
                type="text"
                name="userOwner"
                id="userOwner"
                onChange={this.handleChange}
                value={form ? form.userOwner : ""}
              />
              <br />
              <label htmlFor="dateb">FECHA DE CUMPLEAÑOS</label>
              <input
                className="form-control"
                type="date"
                name="dateb"
                id="dateb"
                onChange={this.handleChange}
                value={form ? form.dateb : ""}
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
