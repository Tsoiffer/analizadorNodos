import { GetStaticProps } from "next";
import React from "react";
import api from "../product/api";
import {Product} from "../product/types"
import { Button, ChakraProvider,Stack, Grid,Text,Link } from "@chakra-ui/react"
let contador = 1;


interface Props {
  clientes: Product[];
}


const IndexRoute: React.FC<Props> = ({clientes}) => {
  contador = 1;
  let imprimirEnPAgina = []
  let clientesConDirectaBaja = []
  let cuadrasConDirectaBaja = []
  let clientesConDirectaAlta = []
  let cuadrasConDirectaAlta = []
  let clientesConRetornoBajo = []
  let cuadrasConRetornoBajo = []
  let clientesConRetornoAlto = []
  let cuadrasConRetornoAlto = []
  let clientesConErroresDs = []
  let cuadrasConErroresDs = []
  let clientesConErroresUs = []
  let cuadrasConErroresUs = []
  let clientesConDsTiltElevado = []
  let cuadrasConDsTiltElevado = []
  let clientesCaidos = []
  let cuadrasCaidas = []
  
  //primero reconocemos a que cuadra pertenece cada cliente
  clientes.forEach((cliente)=> { cliente = recnocimientoDeAlturaDeCuadra(cliente)  })
  //luego separamos a los clientes por su afectacion y si mas del 70% de la cuadra se encuentra afectada la guardamos
  clientesConDirectaBaja = clientes.filter(cliente =>   parseFloat(cliente["Directa"]) < -10 && cliente["Estado"] != "down" && cliente["Calle"] != ""  ) 
  cuadrasConDirectaBaja = cuadrasFueraDeRango(clientes,clientesConDirectaBaja)
  clientesConDirectaAlta = clientes.filter((cliente)=>  parseFloat(cliente["Directa"]) > 10 && cliente["Estado"] != "down" && cliente["Calle"] != "")
  cuadrasConDirectaAlta = cuadrasFueraDeRango(clientes,clientesConDirectaAlta)
  clientesConRetornoBajo = clientes.filter((cliente)=>  cliente["Retorno"] < 37 && cliente["Estado"] != "down" && cliente["Calle"] != "")
  cuadrasConRetornoBajo = cuadrasFueraDeRango(clientes,clientesConRetornoBajo)
  clientesConRetornoAlto = clientes.filter((cliente)=>  cliente["Retorno"] > 50 && cliente["Estado"] != "down" && cliente["Calle"] != "")
  cuadrasConRetornoAlto = cuadrasFueraDeRango(clientes,clientesConRetornoAlto)
  clientesConErroresDs = clientes.filter((cliente)=>  (cliente["Ds FecPost"] != "" || cliente["Ds FecPost"] != "") && cliente["Estado"] != "down" && cliente["Calle"] != "")
  cuadrasConErroresDs = cuadrasFueraDeRango(clientes,clientesConErroresDs)
  clientesConErroresUs = clientes.filter((cliente)=>  (cliente["Us FecPre"] != "" || cliente["Us FecPost"] != "") && cliente["Estado"] != "down" && cliente["Calle"] != "")
  cuadrasConErroresUs = cuadrasFueraDeRango(clientes,clientesConErroresUs)
  clientesConDsTiltElevado = clientes.filter((cliente)=>  parseFloat(cliente["Tilt"]) > 10 && cliente["Estado"] != "down" && cliente["Calle"] != "")
  cuadrasConDsTiltElevado = cuadrasFueraDeRango(clientes,clientesConDsTiltElevado)
  clientesCaidos = clientes.filter((cliente)=>  cliente["Estado"] == "down" && cliente["Calle"] != "")
  cuadrasCaidas = cuadrasFueraDeRango(clientes,clientesCaidos)
  
    imprimirEnPAgina = clientes.map((cliente) => <RecorrerLaLista key={cliente["Cliente"]} value={cliente["Calle"]} />)
  return <div>
    <Stack 
    backgroundColor="primary.500"
    alignItems="center"                      
    borderRadius={9999}
    justifyContent="center"
    >
    <Text  fontWeight="500">Recorda cargar los dato del nodo en la planilla y recargar la pagina</Text>
    <Button 
    isExternal
    as={Link} 
    href="https://docs.google.com/spreadsheets/d/1mKMXK1QCWPZSMxjy3XgOX0I5dNmKSNmazytduxQwbxY/edit?usp=sharing"
    colorScheme="green">
      Planilla
      </Button><br />
      </Stack>
      {Boolean(cuadrasConDirectaBaja.length) && (
    <Grid> <Stack 
    backgroundColor="gray.100"
    alignItems="center"                      
    borderRadius={9999}
    justifyContent="center"
    >
    <Text fontWeight="500"> Se verifican las siguientes cuadras del nodo {clientes[2]["Nodo cmts"]} con niveles de directa bajo: </Text>
    <ul>{cuadrasConDirectaBaja}</ul> 
    </Stack><br /> </Grid>
    )}
    
    {Boolean(cuadrasConDirectaAlta.length) && (
    <Grid> <Stack 
    backgroundColor="gray.100"
    alignItems="center"                      
    borderRadius={9999}
    justifyContent="center">
    <Text  fontWeight="500"> Se verifican las siguientes cuadras del nodo {clientes[2]["Nodo cmts"]} con niveles de directa elevado: </Text>
    <ul>{cuadrasConDirectaAlta}</ul> 
    </Stack><br /> </Grid>
    )}
    
    {Boolean(cuadrasConRetornoBajo.length) && (
    <Grid> <Stack 
    backgroundColor="gray.100"
    alignItems="center"                      
    borderRadius={9999}
    justifyContent="center">
    <Text  fontWeight="500"> Se verifican las siguientes cuadras del nodo {clientes[2]["Nodo cmts"]} con niveles de retorno bajo: </Text>
    <ul>{cuadrasConRetornoBajo}</ul> 
    </Stack><br /> </Grid>
    )}
    
    {Boolean(cuadrasConRetornoAlto.length) && (
    <Grid> <Stack 
    backgroundColor="gray.100"
    alignItems="center"                      
    borderRadius={9999}
    justifyContent="center">
    <Text  fontWeight="500"> Se verifican las siguientes cuadras del nodo {clientes[2]["Nodo cmts"]} con niveles de retorno elevado: </Text>
    <ul>{cuadrasConRetornoAlto}</ul>  
    </Stack><br /> </Grid>
    )}
    
    {Boolean(cuadrasConErroresDs.length) && (
    <Grid> <Stack 
    backgroundColor="gray.100"
    alignItems="center"                      
    borderRadius={9999}
    justifyContent="center">
    <Text  fontWeight="500"> Se verifican las siguientes cuadras del nodo {clientes[2]["Nodo cmts"]} con errores Ds: </Text>
    <ul>{cuadrasConErroresDs}</ul> 
    </Stack><br /> </Grid>
    )}

    {Boolean(cuadrasConErroresUs.length) && (
    <Grid> <Stack 
    backgroundColor="gray.100"
    alignItems="center"                      
    borderRadius={9999}
    justifyContent="center">
    <Text  fontWeight="500"> Se verifican las siguientes cuadras del nodo {clientes[2]["Nodo cmts"]} con errores Us: </Text>
    <ul>{cuadrasConErroresUs}</ul>  
    </Stack> <br /></Grid>
    )}
    
    {Boolean(cuadrasConDsTiltElevado.length) && (
    <Grid> <Stack 
    backgroundColor="gray.100"
    alignItems="center"                      
    borderRadius={9999}
    justifyContent="center">
    <Text  fontWeight="500"> Se verifican las siguientes cuadras del nodo {clientes[2]["Nodo cmts"]} con Ds Tilt eleevado: </Text>
    <ul>{cuadrasConDsTiltElevado}</ul>  
    </Stack> <br /></Grid>
    )}
    {Boolean(cuadrasCaidas.length) && (
    <Grid> <Stack 
    backgroundColor="gray.100"
    alignItems="center"                      
    borderRadius={9999}
    justifyContent="center">
    <Text  fontWeight="500"> Se verifican las siguientes cuadras del nodo {clientes[2]["Nodo cmts"]} caidas </Text>
    <ul>{cuadrasCaidas}</ul>  
    </Stack> <br /></Grid>
    )}

    {/*  <ul>{imprimirEnPAgina}</ul>*/}
    {/* <div>{JSON.stringify(clientes)}</div> */}
    </div>;
};

function recnocimientoDeAlturaDeCuadra(cliente){
  if(cliente["Numero"] != "bandera" ){
    //se suma contador a los clientes para evitar clientes repetidos en la key!
    cliente["Cliente"] =  cliente["Cliente"] + contador;
    contador++
    cliente["Calle"] = CalleYNumero(cliente["Calle"],cliente["Numero"]); 
  cliente["Numero"] = "bandera" }
  return cliente
} // Esta ok 
function CalleYNumero(calle ,numero){
  if(numero == ""){
    return (calle);
  }
  let numeroDeCalle = Math.trunc(parseFloat(numero.replace(".","")) /100);
  return (calle +" " + numeroDeCalle +"00");
} // Esta ok
const RecorrerLaLista = (callesConNumero) => {
  return <li>{callesConNumero.value}</li>
}  // Esta ok


function cuadrasFueraDeRango(clientes,clientesConProblemasDeNiveles){
let cuadrasUnicas = []
let cuadrasConProblemaDeNiveles = []
clientesConProblemasDeNiveles.forEach(cliente => {
  if(!cuadrasUnicas.includes(cliente["Calle"])){
    cuadrasUnicas.push(cliente["Calle"])
  }
});

cuadrasUnicas.forEach(cuadra=> {
  let porcentajeDeCuadraAfectada = (clientesConProblemasDeNiveles.filter(cliente => cliente["Calle"] == cuadra).length) / (clientes.filter(cliente => cliente["Calle"] == cuadra).length)
  if(porcentajeDeCuadraAfectada > 0.7){
    cuadrasConProblemaDeNiveles.push(<li>{cuadra}</li>)
  }
  });
  return cuadrasConProblemaDeNiveles
}

export const getStaticProps: GetStaticProps = async () => {
  const clientes = await api.list();
  return {
    props: {
      clientes,
    },
    revalidate: 10
  };
}
export default IndexRoute;
