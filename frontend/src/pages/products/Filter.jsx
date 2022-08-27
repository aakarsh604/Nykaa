import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  AccordionIcon,
  Stack,
  Checkbox,
  Flex
} from '@chakra-ui/react'
import axios from "axios"
import { useDispatch,useSelector } from "react-redux";

const FIlter = () => {
  const [noOfBRands, SetNoOfBrands] = useState([]);
  const [noOfCategory, SetnoOfCategory] = useState([]);
  const [brandsFil, setBrandFil] = useState([]);
  const [categFil,setCategFil] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get("http://localhost:8080/products/brand").then(({ data }) => {
      SetNoOfBrands(data)
    })
    axios.get("http://localhost:8080/products/category").then(({ data }) => {
      SetnoOfCategory(data)
    })
  }, []);

  const handleCateg = (e ) => {
    const name = e.target.name;
    const isChecked = e.target.checked;
    // console.log(name, isChecked)
    if (isChecked) {
      setCategFil([...categFil,e.target.name])
    } else {
      const filter = categFil.filter((ele) => {
        return ele != name
      });
      setCategFil([...filter])
    }
  }

  const handleBrand = (e) => {
    // console.log(e.target.name);
    const name = e.target.name;
    const isChecked = e.target.checked
    if (isChecked) {
      setBrandFil([...brandsFil,e.target.name])
    } else {
      const filter = brandsFil.filter((ele) => {
        return ele != name
      });
      setBrandFil([...filter])
    }
  }

  // useEffect(() => {
  //   console.log(brandsFil)
  // }, [brandsFil]);

// useEffect(() => {
//     console.log(categFil)
//   }, [categFil]);

  useEffect(() => {
    axios({
  method: 'get',
  url: 'http://localhost:8080/products/filter',
      responseType: 'stream',
      headers: {
        brand: brandsFil,
        product_type:categFil
  }
})
  .then(function (response) {
    // console.log(response.data);
    dispatch({
      type: "getData",
      payload:response.data
    })

  });
  },[brandsFil,categFil])
  
  return <Stack bg="white"><Accordion defaultIndex={[0]} allowMultiple>
    {/* category */}
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left' fontWeight={"bolder"}>
            Category
          </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} spacing={4}>
        {noOfCategory.map((ele, i) => (<Flex justifyContent="space-between" mb={2} key={i}> <label>{ele}</label><Checkbox colorScheme="pink"
          name={ele}
          onChange={(e)=>handleCateg(e)}
        /></Flex>))}
       
    </AccordionPanel>
  </AccordionItem>

    {/* brand */}
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left' fontWeight={"bolder"}>
            Brand
          </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
      <AccordionPanel pb={4}>
        {noOfBRands.map((ele,i) => (<Flex justifyContent="space-between" mb={2} key={i}> <label>{ele}</label><Checkbox colorScheme={"pink"}
          name = {ele}
          onChange={(e) => handleBrand(e)
          }
        ></Checkbox></Flex>))
        
        
        }
      
    </AccordionPanel>
    </AccordionItem>
    
    {/* price */}
       <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left' fontWeight={"bolder"}>
            Price
          </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} gap={2}>
        <Flex justifyContent="space-between" mb={2}> <label>Rs. 0 - Rs. 499</label><Checkbox colorScheme="pink" isDisabled /></Flex>
        <Flex justifyContent="space-between" mb={2}> <label>Rs. 500 - Rs. 999</label><Checkbox colorScheme="pink" isDisabled /></Flex>
        <Flex justifyContent="space-between" mb={2}> <label>Rs. 1000 - Rs. 1999</label><Checkbox colorScheme="pink" isDisabled /></Flex>
        <Flex justifyContent="space-between" mb={2}> <label>Rs. 2000 - Rs. 3999</label><Checkbox colorScheme="pink" isDisabled /></Flex>
        <Flex justifyContent="space-between" mb={2}> <label>{ `Rs. 4000 & above`}</label><Checkbox colorScheme="pink" isDisabled /></Flex>

    </AccordionPanel>
  </AccordionItem>
    {/* gender */}
     <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'fontWeight={"bolder"}>
        Gender
          </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
     <Flex justifyContent="space-between" mb={2}> <label>Female</label><Checkbox colorScheme="pink" isDisabled /></Flex>
        <Flex justifyContent="space-between" mb={2}> <label>Unisex</label><Checkbox colorScheme="pink" isDisabled /></Flex>
        <Flex justifyContent="space-between" mb={2}> <label>Boy</label><Checkbox colorScheme="pink" isDisabled /></Flex>
        <Flex justifyContent="space-between" mb={2}> <label>Male</label><Checkbox colorScheme="pink" isDisabled /></Flex>
    </AccordionPanel>
  </AccordionItem>
</Accordion></Stack>;
};

export default FIlter;
