import React from "react";

type Props = {
  searchParams: { id: string };
};

export default function Stocks({ searchParams: { id } }: Props) {
  return <div>Stocks = {id}</div>;
}
