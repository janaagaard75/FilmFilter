import * as React from 'react'
import { Component } from 'react'

interface Props {
  setMovieNameFilter: (text: string) => void
}

interface State {
  text: string
}

export class FilterForm extends Component<Props, State> {
  private handleChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      text: e.currentTarget.value
    })
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const trimmedText = this.state.text.trim()
    this.props.setMovieNameFilter(trimmedText)
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