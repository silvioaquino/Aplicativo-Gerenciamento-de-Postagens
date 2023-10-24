import { EditIcon, ViewOffIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Formulario from "./Components/Formulario";


const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_post")
      ? JSON.parse(localStorage.getItem("cad_post"))
      : [];

    setData(db_costumer);
  }, [setData]);

  const handleRemove = (title) => {
    const newArray = data.filter((item) => item.title !== title);

    setData(newArray);

    localStorage.setItem("cad_post", JSON.stringify(newArray));
  };

  
    


  

  return (

    <Flex h="100vh" align="center" justify="center" fontSize="15px" fontFamily="poppins">

      <Box maxW={750} w="100%" h="100vh" py={10} px={2}>

        <Box style={{fontWeight: 'bold'}} colorScheme="white" position="absolute" fontSize="18px" textColor="black">
          POSTAGEM
        </Box>

        <Box marginLeft={120}>
          <Input placeholder="Busca aqui" w="20vh" h="4vh" type="text" marginTop={-1}/>
          <Button marginTop={-1} h="4vh">
            <SearchIcon/>
          </Button>
        </Box>
        <Button w="20vh" h="4vh" colorScheme="gray" textColor="black" position="absolute" marginTop={-7} marginLeft={400} onClick={() => [setDataEdit({}), onOpen()]}>
          Nova Postagem
        </Button>
        <Box overFlowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px" textColor="black">
                  Titulo
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px" textColor="black">
                  Tag
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="9px" textColor="black">
                  Publicação
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="8.5px" textColor="black">
                  Atualização
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px" textColor="black">
                  Acesso
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="10px" textColor="black">
                  Ação
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ id, title, tags, published_at, featured_until, youtube_link, primary_text, secondary_text, seo_title, seo_tags }, index) => (
                <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{title}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{tags}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{published_at}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{featured_until}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{youtube_link}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={15}
                      onClick={() => [
                        setDataEdit({ id, title, tags, published_at, featured_until, youtube_link, primary_text, secondary_text, seo_title, seo_tags, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <ViewOffIcon
                      fontSize={15}
                      onClick={() => handleRemove(title)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <Formulario
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;


