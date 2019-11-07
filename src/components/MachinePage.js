import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as machineActions from "../redux/actions/machineActions";
import Modal from "react-modal";
import TextInput from "./common/TextInput";

const DEFAULT_STATE = {
    newMachineModalOpened: false,
    newMachine: {
        name: ""
    }
};

const customStyles = {
  content: {
    top: "36%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "none",
    padding: 0
  }
};

class MachinePage extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  resetState() {
    this.setState(DEFAULT_STATE);
  }

  componentDidMount() {
    this.props.actions.getMachines();
  }

  deleteMachine = machine => {
    this.props.actions.deleteMachine(machine);
  };

  openNewMachineModal = () => {
    this.setState({ ...this.state, newMachineModalOpened: true });
  };

  closeModal = () => {
    this.setState({ ...this.state, ...DEFAULT_STATE });
  };

  createMachine = async () => {
    try {
      this.props.actions.createMachine(this.state.newMachine);
      this.setState({ ...this.state, ...DEFAULT_STATE });
    } catch (e) {
      alert("error: " + e.message);
    }
  };

  render() {
    return (
      <div className="container">
        <Modal
          isOpen={this.state.newMachineModalOpened}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create new Machine</h5>
              <button
                type="button"
                className="close"
                onClick={this.closeModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <TextInput
                name="Name"
                label="Name"
                value={this.state.newMachine.name}
                onChange={e => {
                  this.setState({
                    ...this.state,
                    newMachine: {
                      ...this.state.newMachine,
                      name: e.target.value
                    }
                  });
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.createMachine}
              >
                Create
              </button>
            </div>
          </div>
        </Modal>
        <div className="row">
          <div className="col-12"></div>
        </div>
        <div>
          <button
            type="button"
            onClick={this.openNewMachineModal}
            className="btn btn-primary"
          >
            Create new machine
          </button>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="tableResponsive">
              <table className="table table-hover">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Id</th>
                    <th scope="col">Secret</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.loading && (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <div className="lds-ripple">
                          <div />
                          <div />
                        </div>
                      </td>
                    </tr>
                  )}
                  {this.props.machines.map(machine => {
                    return (
                      <tr key={machine.id}>
                        <td>{machine.name}</td>
                        <td>{machine.id}</td>
                        <td>{machine.secret}</td>
                        <td>
                          <input
                            type="button"
                            className="btn btn-sm btn-outline-danger ml-1"
                            value="Delete"
                            onClick={() => this.deleteMachine(machine)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    machines: state.machines,
    loading: state.requests > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(machineActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MachinePage);
