"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { PlusIcon } from "./icons/PlusIcon";

function ProductForm({columns, selectedItemId,  routingLink}) {
    const transformedColumns = columns.reduce((acc, column) => {
      if (column.uid !== 'acciones'){
        acc[column.uid] = column.name;
      }
      return acc;
      }, {});

  const [product, setProduct] = useState(selectedItemId ? selectedItemId : transformedColumns);
  

  const [isFormValid, setIsFormValid] = useState(false); // New state variable
  console.log(product)
  const form = useRef(null);
  const router = useRouter();
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate the input value
    const isValid = validateInput(name, value);

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
      [`${name}IsValid`]: isValid,
    }));
  };
  useEffect(() => {
    // Check if all inputs are valid
    const isValid = Object.keys(product).every((key) =>
      key.endsWith("IsValid") ? product[key] : true
    );
    setIsFormValid(isValid);
  }, [product]);
  /*
  useEffect(() => {
    if (params.id) {
      axios.get(`/api/${dataTable}/${params.id}`).then((res) => {
        dataStructureKeys.array.forEach(element => {
          
          setProduct({
            ...data,
            element: res.data[element],
            });
          });
        });
      }
    }, []);
    */
   const validateInput = (property, value) =>{
    //console.log(value)
    const regexValues = [
      { property: 'nombre', regex: /^[A-Za-z\s]+$/ },
      { property: 'email', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      { property: 'telefono', regex: /^\d{3}-\d{3}-\d{4}$/ },
      { property: 'semestre', regex: /^[1-9]|10$/ },
      { property: 'unidad_credito', regex: /^[1-6]$/ },
      { property: 'periodo', regex: /^(20[0-9]{2}|2100)-(I|II|III)$/ },
      { property: 'profesor', regex: /^[A-Za-z\s]+$/},
      { property: 'apellido', regex: /^[A-Za-z\s]+$/},
      { property: 'cedula_de_identidad', regex: /^v\d{8}$/ }
    ];
    
const foundObject = regexValues.find(obj => {
  return obj['property'] === property;
});
//console.log(foundObject)
const foundRegex = foundObject ? foundObject['regex'] : null;
console.log(foundRegex)
return foundRegex?.test(value)
   }
  const handleSubmit = async (e) => {
    e.preventDefault();
     
    const params = selectedItemId !== null ? { id: selectedItemId.id } : { id: false };
    
    
    const formData = new FormData();
    
    for (let key in product) {
        if (product.hasOwnProperty(key)) {
          let value = product[key];
          console.log(`Key: ${key}, Value: ${value}`);
          formData.append(`${key}`, `${value}`);
        }
      }

    if (selectedItemId === null) {
      const res = await axios.post("/api/" + routingLink, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      const res = await axios.put("/api/" + routingLink + selectedItemId.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }, params
      });
    }

    router.refresh();
  };

  return (<>
    <form className="p-1">
        {Object.entries(product).map(([property, value]) =>
          property === "id" || property.endsWith("IsValid") ? (
            <></>
          ) : property === "fecha_de_admision" ? (
            <Input
              defaultValue={value as any}
              placeholder={property}
              type="date"
              id={property}
              name={property}
              size="md"
              variant="bordered"
              onChange={handleChange}
            />
          ) : (
            <Input
              className="mb-2"
              defaultValue={value as any}
              label={property}
              type="text"
              id={property}
              name={property}
              size="md"
              variant="bordered"
              onChange={handleChange}
              isInvalid={!product[`${property}IsValid`]}
              color={product[`${property}IsValid`] ? "success" : "danger"}
              errorMessage={
                !product[`${property}IsValid`] && "Please enter a valid value"
              }
            />
          )
        )}
      </form>

                    {
                    /*
                   product.forEach((property) => (
                    <Input
                      defaultValue={product[property]}
                      placeholder={product[property]}
                      label={property}
                      key={property}
                      name={property}
                      size="md"
                      variant="bordered"s
                      onChange={handleChange}
                      required
                    />
                  ));
                    
                    product.map((item) => { return (
                        <Input
                          defaultValue={
                             item
                          }
                          placeholder={
                            item 
                          }
                          label={item}
                          key={item[0]}
                          name={item[0]}
                          size="md"
                          variant="bordered"
                          onChange={handleChange}
                          required
                        />
                        )})*/}
  <Button
  className="bg-foreground text-background my-4"
  endContent={<PlusIcon width={undefined} height={undefined} />}
  size="sm" onClick={handleSubmit}  
  isDisabled={isFormValid === false}
>
  Agregar
</Button>
  </>
)
                    }

export default ProductForm;