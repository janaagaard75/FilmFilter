import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

interface Props {
  setFilter: (text: string) => void
}

interface State {
  text: string
}

// TODO: Use this component or delete it.
@observer
export class FilterForm extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      text: ""
    }
  }

  private handleChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      text: e.currentTarget.value
    })
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const trimmedText = this.state.text.trim()
    this.props.setFilter(trimmedText)
  }

  public render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <div className="input-group">
          <input type="text" className="form-control" onChange={e => this.handleChange(e)}/>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary">Filtrér</button>
          </span>
        </div>
      </form>
    )
  }
}