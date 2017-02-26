import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"

type Tab = "Film" | "Dato" | "Biograf"

interface State {
  activeTab: Tab
}

export class Tabs extends Component<void, State> {
  constructor(props: void, context?: any) {
    super(props, context)

    this.state = {
      activeTab: "Film"
    }
  }

  private handleClick(tab: Tab) {
    this.setState({
      activeTab: tab
    })
  }

  public render() {
    const tabs: Array<Tab> = ["Film", "Dato", "Biograf"]

    return (
      <ul className="nav nav-tabs nav-justified mb-3">
        {tabs.map(tab => {
          const spanClasses = classNames(
            "clickable",
            "nav-link",
            {
              // tslint:disable-next-line:object-literal-key-quotes
              "active": tab === this.state.activeTab
            }
          )

          return (
            <li className="nav-item" key={tab}>
              <span onClick={() => this.handleClick(tab)} className={spanClasses}>
                {tab}
              </span>
            </li>
          )
        })}
      </ul>
    )
  }
}