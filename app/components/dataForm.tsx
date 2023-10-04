"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

function productForm({columns, selectedItemId }) {
  const [product, setProduct] = useState(selectedItemId ? selectedItemId : columns);
  dataStructureKeys = dataStructure ? Object.keys(dataStructure) : null
  
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
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);

    if (!params.id) {
      const res = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      const res = await axios.put("/api/products/" + params.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
    }

    form.current.reset();
    router.refresh();
    router.push("/products");
  };

  return (<>
                    {selectedItemId ? selectedItemId.map((item) => (
                        <Input
                          defaultValue={
                             item
                          }
                          placeholder={
                            item 
                          }
                          label={item}
                          key={Object.keys(item)}
                          type={Object.keys(item)}
                          size="md"
                          variant="bordered"
                          required
                        />
                      ))}
  );
  </>
}

export default ProductForm;