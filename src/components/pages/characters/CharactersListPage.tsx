import React, {useEffect, useState} from "react";
import {CharacterDto} from "../../../types";
import {endpoints} from "../../../constans/endpoints";
import {Typography} from "@mui/joy";
import Alert from "@mui/material/Alert";
import {useSearchParams} from "react-router-dom";
import {PaginationBar} from "../../ui/PaginationBar";
import {
  CharactersFilters,
  CharactersQuery,
  defaultQuery,
} from "./CharactersFilters";
import {CharactersTable} from "./CharactersTable";
import {useApi} from "../../../hooks/useApi";
import {LoadingInfo} from "../../ui/LoadingInfo";

export function CharactersListPage() {
  const [query, setQuery] = useState<CharactersQuery>(defaultQuery);
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialized, setInitialized] = useState(false);
  const {
    get: getData,
    isLoading,
    pagination,
    data,
  } = useApi<Array<CharacterDto>, CharactersQuery>(endpoints.characters, query);

  const handlePaginationPageChange = (page: string) => {
    setQuery(prevQuery => ({
      ...prevQuery,
      page: page,
    }));
  };

  const updateQueryUrl = () => {
    const onlyExistedQuery = Object.fromEntries(
      Object.entries(query).filter(([key, value]) => value !== ""),
    );
    setSearchParams(new URLSearchParams(onlyExistedQuery).toString());
  };

  useEffect(() => {
    let queryFromUrl: CharactersQuery = {...defaultQuery};
    let queryKey: keyof typeof queryFromUrl;

    for (queryKey in queryFromUrl) {
      const value = searchParams.get(queryKey);
      if (value) {
        queryFromUrl = {
          ...queryFromUrl,
          [queryKey]: value,
        };
      }
    }
    setQuery(prevQuery => ({
      ...prevQuery,
      ...queryFromUrl,
    }));
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      updateQueryUrl();
      getData();
    }
  }, [initialized, query]);

  return (
    <div className="App">
      <Typography level="h3" component="h1">
        Characters
      </Typography>

      <CharactersFilters defaultQuery={query} onChange={setQuery} />

      {
        isLoading ? <LoadingInfo />
          : (
            <>
              {data && (
                <div style={{opacity: isLoading ? 0.3 : 1}}>
                  <CharactersTable rows={data} />
                </div>
              )}

              {initialized && !data?.length && (
                <Alert sx={{mt: 2}} severity="info">
                  <>No results.</>
                </Alert>
              )}
            </>
          )
      }

      {pagination && (
        <div>
          <Typography level={"body-xs"} style={{textAlign: "center"}}>
            {query.page} of {pagination?.last}
          </Typography>
          <PaginationBar
            pagination={pagination}
            onChange={handlePaginationPageChange}
          />
        </div>
      )}
    </div>
  );
}
