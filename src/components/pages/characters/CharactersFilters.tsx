import React, {FormEvent, useEffect, useState} from "react";
import {GenderFilter} from "../../../enums";
import {FormControl, FormLabel, Input, Option, Select} from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";

interface CharactersFiltersProps {
  defaultQuery: CharactersQuery;
  onChange: (query: CharactersQuery) => void;
}

const perPageOptions: Array<PageSizes> = ["10", "25", "50"];

type PageSizes = "10" | "25" | "50";

export type CharactersQuery = {
  culture: string;
  gender: GenderFilter;
  pageSize: PageSizes;
  page: string;
};

export const defaultQuery: CharactersQuery = {
  culture: "",
  gender: GenderFilter.Any,
  pageSize: "25",
  page: "1",
};

export function CharactersFilters({
  onChange,
  defaultQuery,
}: CharactersFiltersProps) {
  const [query, setQuery] = useState<CharactersQuery>(defaultQuery);
  const [culturePhrase, setCulturePhrase] = useState(defaultQuery.culture);

  const handleGenderFilterChange = (
    event: React.SyntheticEvent | null,
    newValue: GenderFilter | null,
  ) => {
    const selectedGender = newValue as GenderFilter;
    if (newValue) {
      setQuery(prevQuery => ({
        ...prevQuery,
        gender: selectedGender,
        page: "1",
      }));
    }
  };

  const handleCultureFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCulturePhrase(event.target.value ?? "");
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(prevQuery => ({
      ...prevQuery,
      culture: culturePhrase,
      page: "1",
    }));
  };

  const handlePaginationPerPageChange = (
    event: React.SyntheticEvent | null,
    newValue: PageSizes | null,
  ) => {
    setQuery(prevQuery => ({
      ...prevQuery,
      pageSize: newValue ?? defaultQuery.pageSize,
      page: "1",
    }));
  };

  useEffect(() => {
    setQuery(defaultQuery);
  }, [defaultQuery]);

  useEffect(() => {
    onChange(query);
  }, [onChange, query]);

  return (
    <form onSubmit={handleOnSubmit}>
      <div
        className="SearchAndFilters-tabletUp"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 16,
        }}>
        <FormControl sx={{flex: 1}} size="sm">
          <FormLabel>Search by Culture</FormLabel>
          <Input
            placeholder="Search"
            startDecorator={<SearchIcon />}
            value={culturePhrase}
            onChange={handleCultureFilterChange}
          />
        </FormControl>
        <FormControl size="sm">
          <FormLabel>Gender</FormLabel>
          <Select
            placeholder="Filter by gender"
            value={query.gender}
            onChange={handleGenderFilterChange}
            style={{minWidth: "160px"}}>
            {Object.values(GenderFilter).map(method => (
              <Option key={method} value={method}>
                {method}
              </Option>
            ))}
          </Select>
        </FormControl>
        <FormControl size="sm">
          <FormLabel>Per page</FormLabel>
          <Select
            placeholder="Results per page"
            slotProps={{button: {sx: {whiteSpace: "nowrap"}}}}
            value={query.pageSize}
            onChange={handlePaginationPerPageChange}
            style={{minWidth: "160px"}}>
            {perPageOptions.map(size => (
              <Option key={size} value={size}>
                {size}
              </Option>
            ))}
          </Select>
        </FormControl>
        <button type="submit" style={{display: "none"}}>
          Submit
        </button>
      </div>
    </form>
  );
}
