import { useState, useEffect } from 'react';
import { Box, Button, Flex, Grid, Select } from '@chakra-ui/react'
import {data} from './services/data'
import { kruskal } from './graph/kruskal';
import hearth from './assets/download_1.png'

function App() {
  const [showRoad, setShowRoad] = useState(false);
  const nodesCount = 6;
  const vertsCount = 10;
  let originStates = [];
  let destinationStates = [];
  let distances = [];
  const [result, setResult] = useState([]);

  data.forEach(([state1, state2, weight]) => {
    originStates.push(state1);
    destinationStates.push(state2);
    distances.push(weight);
  })

  useEffect(() => {
    const r = kruskal(nodesCount, vertsCount, originStates, destinationStates, distances);
    setResult(r)
  }, [])

  return (
  <>
    {!showRoad ? (
      <Flex bg={"#"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} h='calc(100vh)' mx={64} fontSize={20}>
        <img style={{height: '300px', marginBottom: "35px"}} src={hearth} alt="hearth"/>
        <Box marginBottom={24}>O que era para ser um encontro apaixonado se transformou em dias de aflição para o jovem Matheus Quadros. 
          O rapaz, de 18 anos, deixou Gravataí-RS rumo a São Paulo para conhecer pessoalmente a namorada virtual, mas não só não encontrou-a, como precisou ser resgatado.
          Após esse momento muito triste na vida de Matheus, ele resolveu aproveitar a viagem e conhecer mais alguns estados do Brasil que ainda não conhecia. Os estados que estão na rota de Matheus são:
          SP, RJ, MG, SC, RS e TO. Ajude Matheus a encontrar o menor percurso para visitar estes estados.
        </Box>
        <Button onClick={() => setShowRoad(!showRoad)}>Mostrar rota</Button>
      </Flex>
    ) : (
      <Flex bg={"#"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} h='calc(100vh)'>
        {result.map(x => (
          <div>
            <h1 style={{fontSize: '24px', marginBottom: '5px'}}>{x}</h1>
          </div>
        ))}
        <Button mt={"60px"} onClick={() => setShowRoad(!showRoad)}>Voltar para a história</Button>
      </Flex>
    )}
  </>
  )
}

export default App;
