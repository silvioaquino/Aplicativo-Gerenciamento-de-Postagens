import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";

const Formulario = ({data, setData, dataEdit, isOpen, onClose}) => {
    const [id, setId] = useState(dataEdit.id || "");
    const [title, setTitle] = useState(dataEdit.title || "");
    const [tags, setTags] = useState(dataEdit.tags || ""); 
    const [published_at, setPublished_at] = useState(dataEdit.published_at || "");
    const [featured_until, setFeatured_until] = useState(dataEdit.featured_until || "");
    const [youtube_link, setYoutube_link] = useState(dataEdit.youtube_link || "");
    const [primary_text, setPrimary_text] = useState(dataEdit.primary_text || "");
    const [secondary_text, setSecondary_text] = useState(dataEdit.secondary_text || "");
    const [seo_title, setSeo_title] = useState(dataEdit.seo_title || "");
    const [seo_tags, setSeo_tags] = useState(dataEdit.seo_tags || "");

    const handleSave = () => {
        if (!title || !tags) return;

        if (titleAlreadyExists()) {
            return alert("title já cadastrado!");
        }

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { id, title, tags, published_at, featured_until, youtube_link, primary_text, secondary_text, seo_title, seo_tags };
        }

        const newDataArray = !Object.keys(dataEdit).length
            ?[...(data ? data : []), { id, title, tags, published_at, featured_until, youtube_link, primary_text, secondary_text, seo_title, seo_tags }]
            :[...(data ? data : [])];

        localStorage.setItem("cad_post", JSON.stringify(newDataArray));

        setData(newDataArray);

        onClose();
    };

    const titleAlreadyExists = () => {
        if (dataEdit.title !== tags && data?.length) {
            return data.find((item) => item.title === tags);
        }

        return false;
    }
    
   

    return ( 
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Nova Postagem</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Id</FormLabel>
                                <Input
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    cursor="pointer"
                                    onClick={() => {setId(id + 1)}}
                                />
                                   
                            </Box>
                            <Box>
                                <FormLabel>Títul</FormLabel>
                                <Input 
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />    
                            </Box>
                            <Box>
                                <FormLabel>Tags</FormLabel>
                                <Input 
                                    type="tags"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                />    
                            </Box>
                            <Box>
                                <FormLabel>Puclicação</FormLabel>
                                <Input 
                                    type="date"
                                    value={published_at}
                                    onChange={(e) => setPublished_at(e.target.value)}
                                />    
                            </Box>
                            <Box>
                                <FormLabel>Atualização</FormLabel>
                                <Input 
                                    type="date"
                                    value={featured_until}
                                    onChange={(e) => setFeatured_until(e.target.value)}
                                />    
                            </Box>
                            <Box>
                                <FormLabel>Acesso</FormLabel>
                                <Input 
                                    type="text"
                                    value={youtube_link}
                                    onChange={(e) => setYoutube_link(e.target.value)}
                                />    
                            </Box>
                            <Box>
                                <FormLabel>Descrição</FormLabel>
                                <Input 
                                    type="text"
                                    value={primary_text}
                                    onChange={(e) => setPrimary_text(e.target.value)}
                                />    
                            </Box>
                            <Box>
                                <FormLabel>Descritivo</FormLabel>
                                <Input 
                                    type="text"
                                    value={secondary_text}
                                    onChange={(e) => setSecondary_text(e.target.value)}
                                />    
                            </Box>
                            <Box>
                                <FormLabel>Seo Title</FormLabel>
                                <Input 
                                    type="text"
                                    value={seo_title}
                                    onChange={(e) => setSeo_title(e.target.value)}
                                />    
                            </Box>
                            <Box>
                                <FormLabel>Seo Tag</FormLabel>
                                <Input 
                                    type="text"
                                    value={seo_tags}
                                    onChange={(e) => setSeo_tags(e.target.value)}
                                />    
                            </Box>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justfyContent="start">
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            Salvar
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>            
        </>
    );
};

export default Formulario;
