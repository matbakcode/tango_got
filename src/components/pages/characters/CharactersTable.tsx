import React from "react";
import {Chip, Table} from "@mui/joy";
import {CharacterDto} from "../../../types";
import {UnknownLabel} from "../../ui/UnknownLabel";
import {Link} from "react-router-dom";

interface CharactersTableProps {
  rows: Array<CharacterDto>;
}

export function CharactersTable({rows}: CharactersTableProps) {
  // If these formatters are used anywhere else we can wonder to put them in catalog like: "formatters"
  const characterLabelFormat = (character: CharacterDto) => {
    return (
      <div>
        {character.name
          ? `${character.name}${character.aliases.length ? ", " : ""}`
          : ""}
        <span style={{fontStyle: "italic"}}>
          {character.aliases.join(", ")}
        </span>
      </div>
    );
  };

  const characterAliveFormatter = (character: CharacterDto) => {
    if (!character.born.length && !character.died.length) {
      return <UnknownLabel />;
    } else if (!character.born.length) {
      return "No";
    } else if (character.died.length) {
      return "No, died at X years old.";
    } else if (!character.died.length) {
      return "Yes";
    }
  };

  const characterGenderFormatter = (character: CharacterDto) => {
    return character.gender.toLowerCase();
  };

  const characterCultureFormatter = (character: CharacterDto) => {
    return character.culture.length ? character.culture : <UnknownLabel />;
  };

  const characterAllegiancesFormatter = (character: CharacterDto) => {
    if (character.allegiances.length) {
      return (
        <div>
          {character.allegiances.map(houseUrl => {
            const houseId = houseUrl.replace(/^\D+/g, "");
            return (
              <Link to={`/houses/${houseId}`} key={houseUrl}>
                <Chip style={{marginRight: 4}}>{houseId}</Chip>
              </Link>
            );
          })}
        </div>
      );
    }
    return "No allegiances";
  };
  // end formatters

  return (
    <Table
      aria-labelledby="tableTitle"
      hoverRow
      borderAxis="x"
      color="neutral"
      size="md"
      stripe="odd"
      variant="outlined">
      <thead>
        <tr>
          <th>Character</th>
          <th>Alive</th>
          <th>Gender</th>
          <th>Culture</th>
          <th>Allegiances</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(character => (
          <tr key={character.url}>
            <td>{characterLabelFormat(character)}</td>
            <td>{characterAliveFormatter(character)}</td>
            <td>{characterGenderFormatter(character)}</td>
            <td>{characterCultureFormatter(character)}</td>
            <td>{characterAllegiancesFormatter(character)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
