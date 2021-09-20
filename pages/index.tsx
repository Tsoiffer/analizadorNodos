import { GetStaticProps } from "next";
import React from "react";
import api from "../product/api";

import {Product} from "../product/types"

interface Props {
  products: Product[];
}
function CalleYNumero(calle ,numero){
  let numeroDeCalle = Math.trunc(Number.parseInt(numero.replace(".",""), 10) /100);
  return (calle +" " + numeroDeCalle );
} // Esta ok , me devuelve 
const RecorrerLaLista = (callesConNumero) => {
  return <li>{callesConNumero.value + "00"}</li>
} // no se como hacerla andar LPM

const IndexRoute: React.FC<Props> = ({products}) => {
  let callesConNumero = []
  callesConNumero.push(...products.map((product)=> CalleYNumero(product["Calle"],product["Numero"])))
  console.log(callesConNumero)
  callesConNumero = callesConNumero.map((calleConNumero) => <RecorrerLaLista key={callesConNumero.toString()} value={calleConNumero} />)
  return <div>
    <ul>{callesConNumero}</ul>
    <div>{JSON.stringify(products)}</div>
    </div>;
};

//todavia No lo programe
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