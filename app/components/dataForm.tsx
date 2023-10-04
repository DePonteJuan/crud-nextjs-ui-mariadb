"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { PlusIcon } from "./icons/PlusIcon";

function ProductForm({columns, selectedItemId,  routingLink}) {
    const transformedColumns = columns.reduce((acc, column) => {
        acc[column.uid] = column.name;
        return acc;
      }, {});

  const [product, setProduct] = useState(selectedItemId ? selectedItemId : Object.assign({}, ...Object.keys(transformedColumns)
  .filter(key => key !== 'ACCIONES')
  .map(key => ({ [key]: transformedColumns[key] }))));
  
  //console.log(product)
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

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

    const formData = new FormData();
    
    for (let key in product) {
        if (product.hasOwnProperty(key)) {
          let value = product[key];
          console.log(`Key: ${key}, Value: ${value}`);
          formData.append(`${key}`, `${value}`);
        }
      }

    if (!params.id) {
      const res = await axios.post("/api/" + routingLink, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      const res = await axios.put("/api/" + routingLink + params.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
    }

    form.current.reset();
    router.refresh();
    router.push("/"+ routingLink);
  };

  return (<>
                    {/*product.forEach(item => (
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
                        )*/}
  <Button
  className="bg-foreground text-background"
  endContent={<PlusIcon width={undefined} height={undefined} />}
  size="sm" onClick={() => handleSubmit}
>
  Agregar
</Button>
  </>
)
                    }

export default ProductForm;