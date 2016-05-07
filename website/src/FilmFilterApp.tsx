import * as React from "react"
import * as ReactDOM from "react-dom"

export interface IAppProps {
}

export interface IAppState {
}

export default class FilmFilterApp extends React.Component<IAppProps, IAppState> {
    public render() {
        return (
            <div className="container">
                <h1>Film Filter</h1>
            </div>)
    }
}

ReactDOM.render(
    <FilmFilterApp/>,
    document.getElementById("filmFilterApp")
)
