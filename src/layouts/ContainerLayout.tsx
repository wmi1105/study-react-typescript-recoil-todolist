import React, { ReactNode } from "react";
import styled from "@emotion/styled";

interface PropTypes {
  children?: ReactNode;
}

export default function ContainerLayout({ children }: PropTypes) {
  return <ContainerWrap>{children}</ContainerWrap>;
}

const ContainerWrap = styled.div`
  text-align: center;
  padding: 50px 30px;
`;
