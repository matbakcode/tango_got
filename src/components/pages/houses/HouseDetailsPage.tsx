import React from "react";
import {Button} from "@mui/joy";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {HouseDto} from "../../../types";
import {endpoints} from "../../../constans/endpoints";
import {HouseDetailsTable} from "./HouseDetailsTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {LoadingInfo} from "../../ui/LoadingInfo";
import {ErrorBar} from "../../ui/ErrorBar";
import {useApi} from "../../../hooks/useApi";

export function HouseDetailsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const houseId = params.houseId;
  const {get, isLoading, data, errorMessage} = useApi<HouseDto, never>(
    endpoints.houseDetails + `/${houseId}`,
  );

  useEffect(() => {
    if (houseId) {
      get();
    }
  }, [houseId]);

  return (
    <div>
      <Button
        variant="solid"
        startDecorator={<ArrowBackIcon />}
        onClick={() => navigate(-1)}>
        Back to Characters
      </Button>

      <div style={{marginTop: "2rem"}}>
        {isLoading ? (
          <LoadingInfo />
        ) : data ? (
          <HouseDetailsTable house={data} />
        ) : (
          <ErrorBar message={errorMessage} />
        )}
      </div>
    </div>
  );
}
