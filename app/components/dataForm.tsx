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
  
  console.log(product)
  const form = useRef(null);
  const router = useRouter();
  
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
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
    <form>
    {Object.entries(product).map(([property, value]) => (
      (property === 'id') ? (
         <></>
      ) :
      (property === 'fecha_de_admision') ? (
        <Input
          defaultValue={value}
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
          defaultValue={value}
          placeholder={property}
          type="text"
          id={property}
          name={property}
          size="md"
          variant="bordered"
          onChange={handleChange}
        />
      )
      ))}
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
  className="bg-foreground text-background"
  endContent={<PlusIcon width={undefined} height={undefined} />}
  size="sm" onClick={handleSubmit}
>
  Agregar
</Button>
  </>
)
                    }

export default ProductForm;