import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Select from "../../components/select/Select";
import { filterOptions } from "../../store/TodoState";
import { useCardCtrl } from "./useCardCtrl";

interface PropTypes {
  cardId: string;
}

export default function Filter({ cardId }: PropTypes) {
  // const allFilter = useRecoilValue(todoState)

  const {onFilter} = useCardCtrl(cardId);

  // useEffect(() => {
  //   onFilter(allFilter)
  // }, [onFilter, allFilter])

  const handleChangeFilter = (code: string) => {
    onFilter(code)
  }

  useEffect(() => {
    console.log()
  }, [onFilter])

  return (
    <FilterWrap>
      <Select options={filterOptions} onChange={handleChangeFilter} value={'all'} />
    </FilterWrap>
  );
}

const FilterWrap = styled.div`
  text-align: right;
  margin-bottom: 10px;
`;
