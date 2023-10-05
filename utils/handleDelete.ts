import axios from "axios";
const handleDeleteElementOfDatabase = async (selectedItemId, routingLink, router) => {
    
    
    const data = {id: selectedItemId.id}
    const url ="/api/" + routingLink + data.id
    console.log(data)
      const res = await axios.request({data, url, method:'delete'}).finally(() =>{
        router.refresh();
      }
      );
    }

export default handleDeleteElementOfDatabase