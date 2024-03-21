import React from "react";
import {Table, Typography} from "@mui/joy";
import {HouseDto} from "../../../types";

export function HouseDetailsTable({house}: {house: HouseDto}) {
  const displayHouse = [
    {
      label: "Name of the House",
      value: house.name,
    },
    {
      label: "Region",
      value: house.region,
    },
    {
      label: "Coat of Arms",
      value: house.coatOfArms,
    },
    {
      label: "Words",
      value: house.words,
    },
    {
      label: "Titles",
      value: house.titles.join(", "),
    },
    {
      label: "Seats",
      value: house.seats.join(", "),
    },
    {
      label: "Has died out",
      value: house.diedOut,
    },
    {
      label: "Has overlord",
      value: house.overlord,
    },
    {
      label: "Number of Cadet Branches",
      value: house.cadetBranches.length,
    },
  ];

  return (
    <Table aria-label="basic table">
      <tbody>
        {displayHouse.map((data, idx) => (
          // idx as key is safe here
          <tr key={idx}>
            <td style={{width: "240px"}}>
              <Typography fontWeight={"lg"}>{data.label}</Typography>
            </td>
            <td>
              {data.value.toString().length ? data.value.toString() : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
