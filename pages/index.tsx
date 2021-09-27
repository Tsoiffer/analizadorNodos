import { GetStaticProps } from "next";
import React from "react";
import api from "../product/api";

import {Product} from "../product/types"

interface Props {
  products: Product[];
}
function CalleYNumero(calle ,numero){
  let numeroDeCalle = Math.trunc(Number.parseInt(numero.replace(".",""), 10) /100);
  return (calle +" " + numeroDeCalle + "00" );
} // Esta ok , me devuelve 
const RecorrerLaLista = (callesConNumero) => {
  return <li>{callesConNumero.value}</li>
} // no se como hacerla andar LPM

const IndexRoute: React.FC<Props> = ({products}) => {
  let contador = 1;
  let callesConNumero = []
  console.log(products)
  callesConNumero.push (products.map((product)=> {
      product["Cliente"] =  product["Cliente"] + contador
      contador++
    product["Calle"] = CalleYNumero(product["Calle"],product["Numero"]); 
    product["Numero"] = "" }))
  console.log(products)
  callesConNumero = products.map((product) => <RecorrerLaLista key={product["Cliente"]} value={product["Calle"]} />)
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