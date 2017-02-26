import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Tab } from "../model/Tab"

interface Props {
  setActiveTab: (tab: Tab) => void
}

interface State {
  activeTab: Tab
}

@observer
export class Tabs extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      activeTab: "Film"
    }
  }

  private setActiveTab(tab: Tab) {
    this.setState({
      activeTab: tab
    })

    this.props.setActiveTab(tab)
  }

  public render() {
    const tabs: Array<Tab> = ["Film", "Dato", "Biograf"]

    return (
      <ul className="nav nav-tabs mb-3">
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
              <span onClick={() => this.setActiveTab(tab)} className={spanClasses}>
                {tab}
              </span>
            </li>
          )
        })}
      </ul>
    )
  }
}