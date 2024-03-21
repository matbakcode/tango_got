import {Button} from "@mui/joy";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import React from "react";
import {PaginationValues} from "../../types";

export function PaginationBar({
  pagination,
  onChange,
}: {
  pagination: PaginationValues;
  onChange: (page: string) => void;
}) {
  const handleChangePagination = (page: number | null) => {
    if (page) {
      onChange(page.toString());
    }
  };

  return (
    <div
      className="Pagination-laptopUp"
      style={{
        paddingTop: 2,
        gap: 1,
        borderRadius: "50%",
        display: "flex",
      }}>
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        startDecorator={<KeyboardDoubleArrowLeftIcon />}
        disabled={!pagination.first}
        onClick={() => handleChangePagination(pagination.first)}>
        First
      </Button>

      <div style={{flex: 1}} />

      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        startDecorator={<KeyboardArrowLeftIcon />}
        disabled={!pagination.prev}
        onClick={() => handleChangePagination(pagination.prev)}>
        Previous
      </Button>
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        endDecorator={<KeyboardArrowRightIcon />}
        disabled={!pagination.next}
        onClick={() => handleChangePagination(pagination.next)}>
        Next
      </Button>

      <div style={{flex: 1}} />

      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        endDecorator={<KeyboardDoubleArrowRightIcon />}
        disabled={!pagination.last}
        onClick={() => handleChangePagination(pagination.last)}>
        Last
      </Button>
    </div>
  );
}
