import React from "react"
import actions from "../../utils/actions"

class AddNote extends React.Component {
  constructor(props) {
    super(props)
    this.input = null

    this.getRef = (ref) => this._getRef(ref)
    this.handleSubmit = (event) => this._handleSubmit(event)
  }

  render() {
    // console.log('-- render:  AddNote');
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <div className="input-group-addon">
            <i className="fa fa-chevron-right" />
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Note..."
            ref={this.getRef}
          />
          <span className="input-group-btn">
            <button className="btn btn-warning" type="submit">
              Add <i className="fa fa-sticky-note" style={{ paddingLeft: 5 }} />
            </button>
          </span>
        </div>
      </form>
    )
  }

  _getRef(ref) {
    this.input = ref
  }

  _handleSubmit(event) {
    event.preventDefault()
    const newNote = this.input.value
    this.input.value = ""
    actions.addNote(newNote)
  }
}

export default AddNote
