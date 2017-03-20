import * as React from "react"
import { Component } from "react"
import { ChangeEvent } from "react"
import { observer } from "mobx-react"

import { SelectableDate } from "../model/SelectableDate"
import { TimeInterval } from "../model/filters/TimeInterval"
import { Week } from "./Week"

interface Props {
  startInterval: TimeInterval
  weeks: Array<Array<SelectableDate>>
}

@observer
export class DatesPicker extends Component<Props, void> {
  // TODO: Extract the time interval picker to a separate component.
  private handleChangeFrom(formEvent: ChangeEvent<HTMLSelectElement>) {
    // TODO: Consider trying to be smart about the value of 'to' when 'from' is updated, and vice versa.
    this.props.startInterval.from = parseInt(formEvent.currentTarget.value, 10)
  }

  private handleChangeTo(formEvent: ChangeEvent<HTMLSelectElement>) {
    this.props.startInterval.to = parseInt(formEvent.currentTarget.value, 10)
  }

  private resetInterval() {
    this.props.startInterval.from = TimeInterval.defaultFrom
    this.props.startInterval.to = TimeInterval.defaultTo
  }

  public render() {
    return (
      <div>
        <div className="form-inline mb-3">
          <label className="mr-3">Starttidspunkt:</label>
          {/* TODO: Consider using an input type="text" with a pattern. */}
          <select
            className="custom-select"
            onChange={e => this.handleChangeFrom(e)}
            value={this.props.startInterval.from}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
          </select>
          <label className="ml-2 mr-2">-</label>
          <select
            className="custom-select"
            onChange={e => this.handleChangeTo(e)}
            value={this.props.startInterval.to}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
          </select>
           <button type="button" className="btn btn-secondary ml-5" onClick={() => this.resetInterval()}>Nulstil</button>
        </div>
        <table className="table table-sm table-text-center">
          <thead>
            <tr>
              <th>Ma</th>
              <th>Ti</th>
              <th>On</th>
              <th>To</th>
              <th>Fr</th>
              <th>Lø</th>
              <th>Sø</th>
            </tr>
          </thead>
          <tbody>
            {this.props.weeks.map(week =>
              <Week key={"week-" + week[0].key} dates={week}/>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}