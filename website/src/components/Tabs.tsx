import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Tab } from "../model/Tab"

interface Props {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

@observer
export class Tabs extends Component<Props, void> {
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
              "active": tab === this.props.activeTab
            }
          )

          return (
            <li className="nav-item" key={tab}>
              <span onClick={() => this.props.setActiveTab(tab)} className={spanClasses}>
                {tab}
              </span>
            </li>
          )
        })}
      </ul>
    )
  }
}