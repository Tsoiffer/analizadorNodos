import { GetStaticProps } from "next";
import React from "react";
import api from "../product/api";

import {Product} from "../product/types"

interface Props {
  products: Product[];
}

const IndexRoute: React.FC<Props> = ({products}) => {

  console.log(...products.map((product)=> product["Calle"])) 
  return <div>{JSON.stringify(products)}</div>;
};

const DirectaFueraDeRango = () =>{

}

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();
  return {
    props: {
      products,
    },
    revalidate: 10
  };
}
export default IndexRoute;