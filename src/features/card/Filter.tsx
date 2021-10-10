import React from "react";
import styled from "@emotion/styled";
import Select from "../../components/select/Select";
import { filterOptions, getAllFilter } from "../../store/TodoState";
import { useCardCtrl } from "./useCardCtrl";
import { useSetRecoilState } from "recoil";

interface PropTypes {
  cardId: string;
}

export default function Filter({ cardId }: PropTypes) {
  const setAllFilter = useSetRecoilState(getAllFilter);
  const { onFilter, getFilterValue } = useCardCtrl(cardId);

  const handleChangeFilter = (code: string) => {
    if (cardId === "") setAllFilter(code);
    else onFilter(code);
  };

  return (
    <FilterWrap>
      <Select
        options={filterOptions}
        onChange={handleChangeFilter}
        value={getFilterValue}
      />
    </FilterWrap>
  );
}

const FilterWrap = styled.div`
  text-align: right;
  margin-bottom: 10px;
`;
