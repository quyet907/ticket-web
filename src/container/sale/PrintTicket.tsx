import React from "react";
import { Ticket } from "../../submodules/base-ticket-team/base-carOwner/Ticket";
import { Trip } from "../../submodules/base-ticket-team/base-carOwner/Trip";

export class PrintTicket extends React.PureComponent<Props , State> {
    render() {
      return (
        <table>
          <thead>
            <th>{this.props.ticket?.customer?.name}</th>
            <th>column 2</th>
            <th>column 3</th>
          </thead>
          <tbody>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
              <td>data 3</td>
            </tr>
          </tbody>
        </table>
      );
    }
  }

  type Props = {
      trip: Trip;
      ticket: Ticket
  }

  type State = {

  }